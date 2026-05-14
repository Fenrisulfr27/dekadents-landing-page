import { MongoClient } from "mongodb";

let cachedClient;

const defaultDbName = "dekadents_db";
const periodOrder = ["week", "month"];
const dateKeyPattern = /^\d{4}-\d{2}-\d{2}$/;

function json(statusCode, body, cacheControl = "no-store") {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": cacheControl,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  };
}

async function getClient() {
  if (cachedClient) return cachedClient;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not configured");
  }

  cachedClient = new MongoClient(uri, {
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  });
  await cachedClient.connect();
  return cachedClient;
}

function getDb(client) {
  const dbName = process.env.MONGODB_DB || defaultDbName;
  return client.db(dbName);
}

function publicPeriodKey(period) {
  if (period === "week") return "thisWeek";
  if (period === "month") return "thisMonth";
  return period;
}

function getTallinnDateKey(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Tallinn",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);

  const values = Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, part.value]),
  );

  return `${values.year}-${values.month}-${values.day}`;
}

function addDaysToDateKey(dateKey, days) {
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

function getPeriodBounds(todayKey = getTallinnDateKey()) {
  const today = new Date(`${todayKey}T00:00:00.000Z`);
  const day = today.getUTCDay();
  const daysSinceMonday = (day + 6) % 7;

  return {
    todayKey,
    weekStartKey: addDaysToDateKey(todayKey, -daysSinceMonday),
    monthStartKey: `${todayKey.slice(0, 8)}01`,
  };
}

function emptyPeriodStats() {
  return {
    totalLines: 0,
    totalWords: 0,
    activeUsers: 0,
    lastMessageAt: null,
  };
}

function addRowToPeriod(stats, activeUsers, row) {
  stats.totalLines += row.lineCount ?? 0;
  stats.totalWords += row.wordCount ?? 0;

  if (row.userId) {
    activeUsers.add(row.userId);
  }

  if (
    row.lastMessageAt &&
    (!stats.lastMessageAt || new Date(row.lastMessageAt) > new Date(stats.lastMessageAt))
  ) {
    stats.lastMessageAt = row.lastMessageAt;
  }
}

function finalizePeriodStats(stats, activeUsers) {
  return {
    ...stats,
    activeUsers: activeUsers.size,
  };
}

export async function handler(event = {}) {
  if (event?.httpMethod === "OPTIONS") {
    return json(204, {});
  }

  try {
    const client = await getClient();
    const db = getDb(client);
    const activity = db.collection("user_activity");
    const periods = db.collection("user_activity_periods");
    const { todayKey, weekStartKey, monthStartKey } = getPeriodBounds();

    const [
      activitySummary,
      activeUsers,
      periodRows,
      topUsers,
    ] = await Promise.all([
      activity
        .aggregate([
          {
            $group: {
              _id: null,
              totalLines: { $sum: { $ifNull: ["$lineCount", 0] } },
              totalWords: { $sum: { $ifNull: ["$wordCount", 0] } },
              lastMessageAt: { $max: "$lastMessageAt" },
            },
          },
        ])
        .next(),
      activity.distinct("userId").then((ids) => ids.length),
      periods
        .find(
          {
            $or: [
              { period: { $in: periodOrder } },
              { period: { $gte: monthStartKey, $lte: todayKey } },
              { key: { $gte: monthStartKey, $lte: todayKey } },
            ],
          },
          {
            projection: {
              _id: 0,
              period: 1,
              key: 1,
              userId: 1,
              lineCount: 1,
              wordCount: 1,
              lastMessageAt: 1,
            },
          },
        )
        .toArray(),
      activity
        .aggregate([
          {
            $addFields: {
              publicName: {
                $ifNull: [
                  "$displayName",
                  {
                    $ifNull: [
                      "$globalName",
                      {
                        $ifNull: ["$name", "$userId"],
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            $sort: {
              lineCount: -1,
              wordCount: -1,
            },
          },
          {
            $limit: 8,
          },
          {
            $project: {
              _id: 0,
              userId: { $ifNull: ["$userId", null] },
              displayName: { $ifNull: ["$displayName", null] },
              name: { $ifNull: ["$publicName", "-"] },
              totalLines: { $ifNull: ["$lineCount", 0] },
              totalWords: { $ifNull: ["$wordCount", 0] },
              lastMessageAt: { $ifNull: ["$lastMessageAt", null] },
            },
          },
        ])
        .toArray(),
    ]);

    const legacyPeriodStats = Object.fromEntries(
      periodOrder.map((period) => [publicPeriodKey(period), emptyPeriodStats()]),
    );
    const legacyPeriodUsers = Object.fromEntries(
      periodOrder.map((period) => [publicPeriodKey(period), new Set()]),
    );
    const datePeriodStats = {
      thisWeek: emptyPeriodStats(),
      thisMonth: emptyPeriodStats(),
    };
    const datePeriodUsers = {
      thisWeek: new Set(),
      thisMonth: new Set(),
    };
    let hasDatePeriodRows = false;

    for (const row of periodRows) {
      const period = row.period ?? row.key;

      if (dateKeyPattern.test(period)) {
        hasDatePeriodRows = true;

        if (period >= monthStartKey && period <= todayKey) {
          addRowToPeriod(datePeriodStats.thisMonth, datePeriodUsers.thisMonth, row);
        }

        if (period >= weekStartKey && period <= todayKey) {
          addRowToPeriod(datePeriodStats.thisWeek, datePeriodUsers.thisWeek, row);
        }

        continue;
      }

      const publicKey = publicPeriodKey(period);
      if (legacyPeriodStats[publicKey]) {
        addRowToPeriod(legacyPeriodStats[publicKey], legacyPeriodUsers[publicKey], row);
      }
    }

    const periodStats = hasDatePeriodRows
      ? {
          thisWeek: finalizePeriodStats(
            datePeriodStats.thisWeek,
            datePeriodUsers.thisWeek,
          ),
          thisMonth: finalizePeriodStats(
            datePeriodStats.thisMonth,
            datePeriodUsers.thisMonth,
          ),
        }
      : {
          thisWeek: finalizePeriodStats(
            legacyPeriodStats.thisWeek,
            legacyPeriodUsers.thisWeek,
          ),
          thisMonth: finalizePeriodStats(
            legacyPeriodStats.thisMonth,
            legacyPeriodUsers.thisMonth,
          ),
        };

    return json(
      200,
      {
        fetchedAt: new Date().toISOString(),
        totals: {
          activeUsers,
          totalLines: activitySummary?.totalLines ?? 0,
          totalWords: activitySummary?.totalWords ?? 0,
          lastMessageAt: activitySummary?.lastMessageAt ?? null,
        },
        periods: {
          ...periodStats,
          allTime: {
            totalLines: activitySummary?.totalLines ?? 0,
            totalWords: activitySummary?.totalWords ?? 0,
            activeUsers,
            lastMessageAt: activitySummary?.lastMessageAt ?? null,
          },
        },
        topUsers,
      },
      "public, max-age=300, stale-while-revalidate=900",
    );
  } catch (error) {
    return json(500, {
      fetchedAt: new Date().toISOString(),
      error: error?.message ?? "Could not load statistics",
    });
  }
}
