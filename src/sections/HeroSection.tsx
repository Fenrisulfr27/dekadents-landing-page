import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { IconBrandDiscord } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export function HeroSection() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <Container
      size={1280}
      pt={{ base: 88, sm: 100, md: 120 }}
      pb={0}
      px={{ base: 16, sm: 20, md: 40 }}
    >
      <Grid gutter={{ base: 24, sm: 32, md: 40 }} align="center">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Stack gap={{ base: "md", sm: "lg" }} maw={390}>
            <Box>
              <Title
                order={1}
                style={{
                  fontSize: "clamp(36px, 8vw, 76px)",
                  letterSpacing: 5,
                  fontWeight: 500,
                  lineHeight: 1.1,
                }}
              >
                {t.dekadents}
              </Title>

              <Text
                mt={{ base: "sm", sm: "md" }}
                style={{
                  color: "#c8c2b8",
                  letterSpacing: 2.2,
                  fontSize: "clamp(12px, 2vw, 15px)",
                  lineHeight: 1.5,
                  maxWidth: 300,
                }}
              >
                {t.communityDescription}
              </Text>
            </Box>

            <Divider color="rgba(255,255,255,0.1)" maw={160} />

            <Text c="gray.4" size="md" lh={1.7} maw={340}>
              {t.communityText}
            </Text>

            <Group gap={{ base: 8, sm: 12 }} wrap="wrap">
              <Button
                component="a"
                href="https://discord.gg/wCykm7AFNE"
                target="_blank"
                size="md"
                radius={0}
                leftSection={<IconBrandDiscord size={16} />}
                styles={{
                  root: {
                    background: "#ece5d8",
                    color: "#121212",
                    border: "1px solid rgba(255,255,255,0.12)",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    paddingInline: 16,
                    minWidth: "auto",
                  },
                }}
              >
                {t.joinDiscord}
              </Button>

              <Button
                size="md"
                radius={0}
                variant="outline"
                styles={{
                  root: {
                    color: "#e3ded6",
                    borderColor: "rgba(255,255,255,0.18)",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    paddingInline: 16,
                    minWidth: "auto",
                  },
                }}
              >
                {t.learnMore}
              </Button>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Group justify="center">
            <Box
              component="img"
              src="/assets/logo.png"
              alt="logo.png"
              style={{
                width: "100%",
                maxWidth: 520,
                height: "auto",
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 0 24px rgba(255,255,255,0.08))",
                userSelect: "none",
                pointerEvents: "none",
              }}
            />
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
