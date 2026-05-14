import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconRefresh, IconTrendingUp, IconUsers } from "@tabler/icons-react";
import PageFrame from "../components/PageFrame";
import { SectionContainer } from "../components/SectionContainer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

type PeriodStats = {
  totalLines: number;
  totalWords: number;
  activeUsers: number;
  lastMessageAt: string | null;
};

type StatisticsResponse = {
  fetchedAt: string;
  totals: {
    activeUsers: number;
    totalLines: number;
    totalWords: number;
    totalPoints: number;
    pointUsers: number;
    lastMessageAt: string | null;
  };
  periods: {
    today: PeriodStats;
    thisWeek: PeriodStats;
    thisMonth: PeriodStats;
    thisYear: PeriodStats;
  };
};

function formatNumber(value: number, locale: string) {
  return new Intl.NumberFormat(locale).format(value);
}

function formatDate(value: string | null, locale: string) {
  if (!value) return "-";
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note?: string;
}) {
  return (
    <Card
      radius={0}
      p={{ base: "md", sm: "lg" }}
      style={{
        background: "rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Stack gap={8}>
        <Text
          style={{
            color: "#bdb5aa",
            textTransform: "uppercase",
            letterSpacing: 2,
            fontSize: 18,
          }}
        >
          {label}
        </Text>
        <Title
          order={2}
          style={{
            color: "#f1eadf",
            fontFamily: '"Cinzel", "Cormorant Garamond", serif',
            fontSize: "clamp(28px, 6vw, 48px)",
            fontWeight: 500,
            lineHeight: 1,
          }}
        >
          {value}
        </Title>
        {note && (
          <Text c="gray.5" size="md">
            {note}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export default function StatisticsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const locale = language === "et" ? "et-EE" : "en";
  const [data, setData] = useState<StatisticsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadStatistics() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/.netlify/functions/statistics");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setData(await response.json());
    } catch {
      setError(t.statisticsLoadError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStatistics();
  }, []);

  const periodItems = useMemo(() => {
    if (!data) return [];

    return [
      [t.today, data.periods.today],
      [t.thisWeek, data.periods.thisWeek],
      [t.thisMonth, data.periods.thisMonth],
      [t.thisYear, data.periods.thisYear],
    ] as const;
  }, [data, t]);

  return (
    <>
      <Helmet>
        <title>Dekadentsi statistika - Dekadents</title>
        <meta
          name="description"
          content="Dekadentsi kogukonna avalik koondstatistika Discordi aktiivsuse kohta."
        />
        <meta property="og:title" content="Dekadentsi statistika" />
        <meta
          property="og:description"
          content="Avalik ülevaade Dekadentsi kogukonna aktiivsusest."
        />
        <meta property="og:url" content="https://dekadents.eu/statistics" />
        <link rel="canonical" href="https://dekadents.eu/statistics" />
      </Helmet>

      <PageFrame>
        <SectionContainer>
          <Stack gap="lg">
            <Group justify="space-between" align="flex-end" gap="lg">
              <Stack gap="md" maw={760}>
                <Text
                  style={{
                    color: "#cfc8be",
                    textTransform: "uppercase",
                    letterSpacing: 3,
                    fontSize: "20px",
                  }}
                >
                  {t.statisticsEyebrow}
                </Text>
                <Title
                  order={1}
                  style={{
                    fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                    fontSize: "clamp(32px, 7vw, 78px)",
                    lineHeight: 1.1,
                    letterSpacing: 5,
                    fontWeight: 500,
                  }}
                >
                  {t.statistics}
                </Title>
                <Text c="gray.4" size="md" maw={700} lh={1.7}>
                  {t.statisticsDescription}
                </Text>
              </Stack>

              <Button
                radius={0}
                variant="outline"
                leftSection={<IconRefresh size={16} />}
                onClick={loadStatistics}
                loading={loading}
                styles={{
                  root: {
                    borderColor: "rgba(255,255,255,0.18)",
                    color: "#ece5d8",
                    textTransform: "uppercase",
                    letterSpacing: 1.6,
                  },
                }}
              >
                {t.refresh}
              </Button>
            </Group>

            {error && (
              <Card
                radius={0}
                p="lg"
                style={{
                  background: "rgba(120,45,45,0.18)",
                  border: "1px solid rgba(255,120,120,0.18)",
                }}
              >
                <Text c="gray.2">{error}</Text>
              </Card>
            )}

            {data && (
              <>
                <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="lg">
                  <StatCard
                    label={t.activeUsers}
                    value={formatNumber(data.totals.activeUsers, locale)}
                    note={t.withMessages}
                  />
                  <StatCard
                    label={t.totalLines}
                    value={formatNumber(data.totals.totalLines, locale)}
                  />
                  <StatCard
                    label={t.totalWords}
                    value={formatNumber(data.totals.totalWords, locale)}
                  />
                  <StatCard
                    label={t.totalPoints}
                    value={formatNumber(data.totals.totalPoints, locale)}
                    note={`${formatNumber(data.totals.pointUsers, locale)} ${t.pointUsers}`}
                  />
                </SimpleGrid>

                <Card
                  radius={0}
                  p={{ base: "md", sm: "lg" }}
                  style={{
                    background: "rgba(255,255,255,0.018)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <Stack gap="md">
                    <Group gap="sm">
                      <IconTrendingUp size={20} color="#d8d0c3" />
                      <Title
                        order={2}
                        style={{
                          fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                          fontSize: "clamp(24px, 4vw, 36px)",
                          fontWeight: 500,
                          letterSpacing: 2,
                        }}
                      >
                        {t.periodActivity}
                      </Title>
                    </Group>

                    <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing="md">
                      {periodItems.map(([label, item]) => (
                        <Card
                          key={label}
                          radius={0}
                          p="md"
                          style={{
                            background: "rgba(0,0,0,0.18)",
                            border: "1px solid rgba(255,255,255,0.07)",
                          }}
                        >
                          <Stack gap={10}>
                            <Group justify="space-between" gap="xs">
                              <Badge
                                radius={0}
                                variant="outline"
                                color="gray"
                                style={{
                                  borderColor: "rgba(255,255,255,0.18)",
                                  color: "#d8d0c3",
                                  letterSpacing: 1.2,
                                  textTransform: "uppercase",
                                }}
                              >
                                {label}
                              </Badge>
                              <Group gap={6}>
                                <IconUsers size={15} color="#a9a095" />
                                <Text c="gray.4" size="sm">
                                  {formatNumber(item.activeUsers, locale)}
                                </Text>
                              </Group>
                            </Group>
                            <Text c="gray.2" size="md">
                              {formatNumber(item.totalLines, locale)}{" "}
                              {t.linesShort}
                            </Text>
                            <Text c="gray.5" size="md">
                              {formatNumber(item.totalWords, locale)}{" "}
                              {t.wordsShort}
                            </Text>
                            <Text c="gray.6" size="sm">
                              {t.lastActivity}:{" "}
                              {formatDate(item.lastMessageAt, locale)}
                            </Text>
                          </Stack>
                        </Card>
                      ))}
                    </SimpleGrid>
                  </Stack>
                </Card>

                <Text c="gray.6" size="md">
                  {t.lastUpdated}: {formatDate(data.fetchedAt, locale)}
                </Text>
              </>
            )}
          </Stack>
        </SectionContainer>
      </PageFrame>
    </>
  );
}
