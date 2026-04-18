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
    <Container size={1280} pt={46} pb={0}>
      <Grid gutter={40} align="center">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <Stack gap="lg" maw={390}>
            <Box>
              <Title
                order={1}
                style={{
                  fontSize: "clamp(52px, 7vw, 76px)",
                  letterSpacing: 7,
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {t.dekadents}
              </Title>

              <Text
                mt="md"
                style={{
                  color: "#c8c2b8",
                  textTransform: "uppercase",
                  letterSpacing: 2.6,
                  fontSize: 15,
                  lineHeight: 1.45,
                  maxWidth: 300,
                }}
              >
                {t.communityDescription}
              </Text>
            </Box>

            <Divider color="rgba(255,255,255,0.1)" maw={160} />

            <Text c="gray.4" size="lg" lh={1.7} maw={340}>
              {t.communityText}
            </Text>

            <Group>
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
                    paddingInline: 22,
                    minWidth: 148,
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
                    paddingInline: 22,
                    minWidth: 132,
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
