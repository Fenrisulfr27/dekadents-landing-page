import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconArrowRight, IconRefresh } from "@tabler/icons-react";
import PageFrame from "../components/PageFrame";
import { SectionContainer } from "../components/SectionContainer";
import { translations } from "../data/translations";
import { useLanguage } from "../context/LanguageContext";

type Exhibition = {
  id: string;
  title: string;
  source: string;
  location?: string;
  dateLabel?: string;
  description?: string;
  url?: string;
  image?: string;
};

type ExhibitionsResponse = {
  fetchedAt: string;
  exhibitions: Exhibition[];
  errors?: { source: string; message: string }[];
};

const sourceFilters = [
  "Kõik",
  "Muuseumikaart",
  "NOBA",
  "Eesti Kunstimuuseum",
] as const;

function ExhibitionCard({ item }: { item: Exhibition }) {
  return (
    <Card
      radius={0}
      padding={0}
      style={{
        overflow: "hidden",
        background: "rgba(255,255,255,0.018)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        component={item.url ? "a" : "div"}
        href={item.url}
        target="_blank"
        rel="noreferrer"
        style={{
          display: "block",
          aspectRatio: "4 / 3",
          background: "#070707",
          textDecoration: "none",
          overflow: "hidden",
        }}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            loading="lazy"
            h="100%"
            fit="cover"
            style={{ filter: "brightness(0.76) contrast(1.08)" }}
          />
        ) : (
          <Stack h="100%" align="center" justify="center" px="md">
            <Text
              ta="center"
              style={{
                color: "#777064",
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: 20,
              }}
            >
              {item.source}
            </Text>
          </Stack>
        )}
      </Box>

      <Stack gap={12} p={{ base: "md", sm: "lg" }}>
        <Group gap="xs" wrap="wrap">
          <Badge
            radius={0}
            variant="outline"
            color="gray"
            style={{
              borderColor: "rgba(255,255,255,0.18)",
              color: "#d8d0c3",
              letterSpacing: 1.2,
              textTransform: "uppercase",
              fontSize: 20,
            }}
          >
            {item.source}
          </Badge>
          {item.dateLabel && (
            <Badge
              radius={0}
              variant="light"
              color="gray"
              style={{
                color: "#ece5d8",
                background: "rgba(255,255,255,0.06)",
              }}
            >
              {item.dateLabel}
            </Badge>
          )}
        </Group>

        <Title
          order={2}
          style={{
            fontFamily: '"Cinzel", "Cormorant Garamond", serif',
            fontSize: "clamp(20px, 4vw, 30px)",
            letterSpacing: 1.5,
            fontWeight: 500,
            lineHeight: 1.15,
          }}
        >
          {item.title}
        </Title>

        {item.location && (
          <Text
            c="gray.5"
            size="md"
            style={{ textTransform: "uppercase", letterSpacing: 1.4 }}
          >
            {item.location}
          </Text>
        )}

        {item.description && (
          <Text c="gray.4" size="md" lh={1.65} lineClamp={4}>
            {item.description}
          </Text>
        )}

        {item.url && (
          <Button
            component="a"
            href={item.url}
            target="_blank"
            rel="noreferrer"
            radius={0}
            variant="subtle"
            rightSection={<IconArrowRight size={15} />}
            px={0}
            style={{
              alignSelf: "flex-start",
              color: "#ece5d8",
              textTransform: "uppercase",
              letterSpacing: 1.6,
            }}
          >
            Ava allikas
          </Button>
        )}
      </Stack>
    </Card>
  );
}

export default function ExhibitionsPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [activeSource, setActiveSource] =
    useState<(typeof sourceFilters)[number]>("Kõik");
  const [data, setData] = useState<ExhibitionsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadExhibitions() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/.netlify/functions/exhibitions");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setData(await response.json());
    } catch {
      setError(t.exhibitionsLoadError);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadExhibitions();
  }, []);

  const exhibitions = data?.exhibitions ?? [];
  const filtered = useMemo(() => {
    if (activeSource === "Kõik") return exhibitions;
    return exhibitions.filter((item) => item.source === activeSource);
  }, [activeSource, exhibitions]);

  return (
    <>
      <Helmet>
        <title>Eesti kunstinäitused — Dekadents</title>
        <meta
          name="description"
          content="Dekadents koondab avatud Eesti kunstinäitusi Muuseumikaardilt, NOBAst ja Eesti Kunstimuuseumist. Leia näitusi, kunstisündmusi ja inspiratsiooni."
        />
        <meta property="og:title" content="Eesti kunstinäitused — Dekadents" />
        <meta
          property="og:description"
          content="Avatud Eesti kunstinäitused Muuseumikaardilt, NOBAst ja Eesti Kunstimuuseumist."
        />
        <meta property="og:url" content="https://dekadents.eu/exhibitions" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dekadents.eu/exhibitions" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Eesti kunstinäitused",
            url: "https://dekadents.eu/exhibitions",
            inLanguage: "et-EE",
            description:
              "Dekadentsi ülevaade avatud Eesti kunstinäitustest Muuseumikaardilt, NOBAst ja Eesti Kunstimuuseumist.",
            about: ["Eesti kunst", "kunstinäitused", "kunstisündmused"],
            isPartOf: {
              "@type": "WebSite",
              name: "Dekadents",
              url: "https://dekadents.eu",
            },
          })}
        </script>
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
                  {t.exhibitionsEyebrow}
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
                  {t.exhibitions}
                </Title>
                <Text c="gray.4" size="md" maw={700} lh={1.7}>
                  {t.exhibitionsDescription}
                </Text>
              </Stack>

              <Button
                radius={0}
                variant="outline"
                leftSection={<IconRefresh size={16} />}
                onClick={loadExhibitions}
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

            <Group gap="sm" wrap="wrap">
              {sourceFilters.map((source) => (
                <Button
                  key={source}
                  radius={0}
                  size="md"
                  variant={activeSource === source ? "filled" : "outline"}
                  onClick={() => setActiveSource(source)}
                  styles={{
                    root: {
                      background:
                        activeSource === source ? "#ece5d8" : "transparent",
                      color: activeSource === source ? "#111" : "#e7e0d6",
                      borderColor: "rgba(255,255,255,0.18)",
                      textTransform: "uppercase",
                      letterSpacing: 1.4,
                      fontSize: "20px",
                    },
                  }}
                >
                  {source === "Kõik" ? t.all : source}
                </Button>
              ))}
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

            {!error && !loading && filtered.length === 0 && (
              <Text c="gray.4" size="md">
                {t.noExhibitionsFound}
              </Text>
            )}

            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 3 }}
              spacing="lg"
              verticalSpacing="lg"
            >
              {filtered.map((item) => (
                <ExhibitionCard key={item.id} item={item} />
              ))}
            </SimpleGrid>

            {data?.fetchedAt && (
              <Text c="gray.6" size="md">
                {t.lastUpdated}:{" "}
                {new Intl.DateTimeFormat(language === "et" ? "et-EE" : "en", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(data.fetchedAt))}
              </Text>
            )}
          </Stack>
        </SectionContainer>
      </PageFrame>
    </>
  );
}
