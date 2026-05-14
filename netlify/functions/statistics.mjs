import { MongoClient } from "mongodb";

let cachedClient;

const defaultDbName = "dekadents_db";
const periodOrder = ["day", "week", "month", "year"];

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
  if (period === "day") return "today";
  if (period === "week") return "thisWeek";
  if (period === "month") return "thisMonth";
  if (period === "year") return "thisYear";
  return period;
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
        .aggregate([
          {
            $match: {
              period: { $in: periodOrder },
            },
          },
          {
            $group: {
              _id: "$period",
              totalLines: { $sum: { $ifNull: ["$lineCount", 0] } },
              totalWords: { $sum: { $ifNull: ["$wordCount", 0] } },
              activeUsers: { $addToSet: "$userId" },
              lastMessageAt: { $max: "$lastMessageAt" },
            },
          },
          {
            $project: {
              _id: 0,
              period: "$_id",
              totalLines: 1,
              totalWords: 1,
              activeUsers: { $size: "$activeUsers" },
              lastMessageAt: 1,
            },
          },
        ])
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
                      "$username",
                      {
                        $ifNull: [
                          "$globalName",
                          {
                            $ifNull: ["$name", null],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            },
          },
          {
            $match: {
              publicName: { $type: "string", $ne: "" },
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
              name: "$publicName",
              totalLines: { $ifNull: ["$lineCount", 0] },
              totalWords: { $ifNull: ["$wordCount", 0] },
              lastMessageAt: { $ifNull: ["$lastMessageAt", null] },
            },
          },
        ])
        .toArray(),
    ]);

    const periodStats = Object.fromEntries(
      periodOrder.map((period) => [
        publicPeriodKey(period),
        {
          totalLines: 0,
          totalWords: 0,
          activeUsers: 0,
          lastMessageAt: null,
        },
      ]),
    );

    for (const row of periodRows) {
      periodStats[publicPeriodKey(row.period)] = {
        totalLines: row.totalLines ?? 0,
        totalWords: row.totalWords ?? 0,
        activeUsers: row.activeUsers ?? 0,
        lastMessageAt: row.lastMessageAt ?? null,
      };
    }

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
        periods: periodStats,
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
