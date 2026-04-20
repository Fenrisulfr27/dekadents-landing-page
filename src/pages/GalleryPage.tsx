import React, { useMemo, useState } from "react";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Group,
  Overlay,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandDiscord, IconArrowRight } from "@tabler/icons-react";
import PageFrame from "../components/PageFrame";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

type GalleryItem = {
  id: number;
  title: string;
  artist: string;
  category: "featured" | "digital" | "traditional" | "photography" | "sketches";
  image: string;
  sourceUrl?: string;
  description?: string;
  tall?: boolean;
};
const items: GalleryItem[] = [
  {
    id: 1,
    title: "AA78",
    artist: "Zdzisław Beksiński",
    category: "featured",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/AA78_by_Zdzislaw_Beksinski_1978.jpg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:AA78_by_Zdzislaw_Beksinski_1978.jpg",
    description: "Oil painting, 1978.",
    tall: true,
  },
  {
    id: 2,
    title: "Untitled Painting",
    artist: "Zdzisław Beksiński",
    category: "traditional",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Untitled_painting_by_Zdzislaw_Beksinski_1984.jpg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Untitled_painting_by_Zdzislaw_Beksinski_1984.jpg",
    description: "Acrylic on beaverboard, 1984.",
    tall: true,
  },
  {
    id: 3,
    title: "Król i królowa",
    artist: "Zdzisław Beksiński",
    category: "traditional",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Krol_i_krolowa_by_Zdzislaw_Beksinski_1993.jpg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Krol_i_krolowa_by_Zdzislaw_Beksinski_1993.jpg",
    description: "King and Queen, 1993.",
  },
  {
    id: 4,
    title: "Untitled Computer Graphic",
    artist: "Zdzisław Beksiński",
    category: "digital",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Untitled_computer_graphic_by_Zdzislaw_Beksinski_2001.jpg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Untitled_computer_graphic_by_Zdzislaw_Beksinski_2001.jpg",
    description: "Computer graphic, 2001.",
  },
  {
    id: 5,
    title: "Untitled Computer Graphic II",
    artist: "Zdzisław Beksiński",
    category: "digital",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/Untitled_computer_graphic_2_by_Zdzislaw_Beksinski_2001.jpg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:Untitled_computer_graphic_2_by_Zdzislaw_Beksinski_2001.jpg",
    description: "Computer graphic, 2001.",
  },
  {
    id: 6,
    title: "S4",
    artist: "Zdzisław Beksiński",
    category: "featured",
    image:
      "https://commons.wikimedia.org/wiki/Special:FilePath/S4_by_Zdzislaw_Beksinski_2004.jpg",
    sourceUrl:
      "https://commons.wikimedia.org/wiki/File:S4_by_Zdzislaw_Beksinski_2004.jpg",
    description: "Oil painting, 2004.",
    tall: true,
  },
];

const filters = [
  "all",
  "featured",
  "digital",
  "traditional",
  "photography",
  "sketches",
] as const;

type Filter = (typeof filters)[number];

function GalleryCard({ item }: { item: GalleryItem }) {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Card
      radius={0}
      padding={0}
      style={{
        overflow: "hidden",
        background: "rgba(255,255,255,0.015)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <Box
        component="a"
        href={item.sourceUrl}
        target="_blank"
        rel="noreferrer"
        style={{
          position: "relative",
          aspectRatio: item.tall ? "4 / 5.2" : "4 / 3.6",
          overflow: "hidden",
          backgroundColor: "#070707",
          display: "block",
          textDecoration: "none",
        }}
      >
        <Box
          component="img"
          src={item.image}
          alt={item.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            filter: "brightness(0.78) contrast(1.08)",
            transform: "scale(1.01)",
          }}
        />
        <Overlay
          gradient="linear-gradient(180deg, rgba(0,0,0,0.06), rgba(0,0,0,0.7))"
          opacity={1}
        />
        <Badge
          radius={0}
          variant="outline"
          color="gray"
          style={{
            position: "absolute",
            top: 14,
            left: 14,
            zIndex: 2,
            borderColor: "rgba(255,255,255,0.22)",
            color: "#ece6dc",
            letterSpacing: 1.5,
            textTransform: "uppercase",
            background: "rgba(0,0,0,0.28)",
            fontSize: "10px",
          }}
        >
          {t[item.category]}
        </Badge>
      </Box>

      <Stack gap={10} p={{ base: "md", sm: "lg" }}>
        <Text
          style={{
            color: "#e6dfd4",
            textTransform: "uppercase",
            letterSpacing: 3,
            fontSize: "clamp(16px, 3.5vw, 22px)",
            lineHeight: 1.1,
          }}
        >
          {item.title}
        </Text>

        <Text
          c="gray.5"
          size="sm"
          style={{ letterSpacing: 1.8, textTransform: "uppercase" }}
        >
          {item.artist}
        </Text>

        {item.description && (
          <Text c="gray.4" size="sm" lh={1.7}>
            {item.description}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const { language } = useLanguage();
  const t = translations[language];

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter]);

  const featured = items[0];

  return (
    <PageFrame>
      <Container
        size={1280}
        pt={{ base: 88, sm: 100, md: 120 }}
        pb={{ base: 40, sm: 52, md: 72 }}
        px={{ base: 16, sm: 20, md: 40 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Stack gap="lg">
          <Stack gap="md" maw={760}>
            <Text
              style={{
                color: "#cfc8be",
                textTransform: "uppercase",
                letterSpacing: 3,
                fontSize: "clamp(11px, 1.5vw, 14px)",
              }}
            >
              {t.curatedArchive}
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
              {t.gallery}
            </Title>

            <Text c="gray.4" size="md" maw={700} lh={1.7}>
              {t.galleryDescription}
            </Text>
          </Stack>

          <Group gap="sm" wrap="wrap">
            {filters.map((filter) => (
              <Button
                key={filter}
                radius={0}
                size="sm"
                variant={activeFilter === filter ? "filled" : "outline"}
                onClick={() => setActiveFilter(filter)}
                styles={{
                  root: {
                    background:
                      activeFilter === filter ? "#ece5d8" : "transparent",
                    color: activeFilter === filter ? "#111" : "#e7e0d6",
                    borderColor: "rgba(255,255,255,0.18)",
                    textTransform: "uppercase",
                    letterSpacing: 1.5,
                    fontSize: "clamp(10px, 1.5vw, 12px)",
                  },
                }}
              >
                {t[filter]}
              </Button>
            ))}
          </Group>

          <Card
            radius={0}
            padding={0}
            style={{
              overflow: "hidden",
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing={0}>
              <Box
                component="img"
                src={featured.image}
                alt={featured.title}
                style={{
                  width: "100%",
                  height: "100%",
                  minHeight: "clamp(300px, 50vw, 460px)",
                  objectFit: "cover",
                  display: "block",
                  filter: "brightness(0.82) contrast(1.06)",
                }}
              />
              <Stack justify="center" p={{ base: 20, sm: 32, md: 48 }} gap="lg">
                <Text
                  style={{
                    color: "#bfb7ab",
                    textTransform: "uppercase",
                    letterSpacing: 2.5,
                    fontSize: "clamp(11px, 1.5vw, 14px)",
                  }}
                >
                  {t.featuredWork}
                </Text>

                <Title
                  order={2}
                  style={{
                    fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                    fontSize: "clamp(28px, 5.5vw, 54px)",
                    letterSpacing: 3,
                    fontWeight: 500,
                    lineHeight: 1.05,
                  }}
                >
                  {featured.title}
                </Title>

                <Text
                  c="gray.5"
                  size="sm"
                  style={{ textTransform: "uppercase", letterSpacing: 2 }}
                >
                  {featured.artist}
                </Text>

                <Text c="gray.4" size="md" lh={1.8} maw={520}>
                  {featured.description}
                </Text>
                <Button
                  component="a"
                  href={featured.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  radius={0}
                  size="md"
                  variant="outline"
                  rightSection={<IconArrowRight size={16} />}
                  styles={{
                    root: {
                      alignSelf: "flex-start",
                      borderColor: "rgba(255,255,255,0.18)",
                      color: "#ece5d8",
                      textTransform: "uppercase",
                      letterSpacing: 2,
                    },
                  }}
                >
                  View work
                </Button>
              </Stack>
            </SimpleGrid>
          </Card>

          <SimpleGrid
            cols={{ base: 1, sm: 2, lg: 3 }}
            spacing="lg"
            verticalSpacing="lg"
          >
            {filteredItems.map((item) => (
              <GalleryCard key={item.id} item={item} />
            ))}
          </SimpleGrid>
          <Text c="gray.5" size="sm" mt="lg">
            Works by Zdzisław Beksiński, used via Wikimedia Commons under CC
            BY-SA 3.0. Attribution: Zdzisław Beksiński (copyrights inherited by
            Muzeum Historyczne w Sanoku).
          </Text>

          <Card
            radius={0}
            p={{ base: 24, sm: 32, md: 48 }}
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Stack align="center" gap="lg">
              <Text
                style={{
                  fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                  textTransform: "uppercase",
                  letterSpacing: 4,
                  fontSize: "clamp(20px, 5vw, 52px)",
                  lineHeight: 1.1,
                }}
              >
                {t.submitWork}
              </Text>

              <Text c="gray.4" ta="center" maw={760} size="md" lh={1.8}>
                {t.submitDescription}
              </Text>

              <Button
                component="a"
                href="https://discord.gg/wCykm7AFNE"
                target="_blank"
                radius={0}
                size="md"
                leftSection={<IconBrandDiscord size={16} />}
                styles={{
                  root: {
                    background: "#ece5d8",
                    color: "#111",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                  },
                }}
              >
                {t.joinOurDiscord}
              </Button>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </PageFrame>
  );
}
