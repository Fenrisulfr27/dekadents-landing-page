import React from "react";
import { Container, Stack, Text, Title, Divider } from "@mantine/core";
import PageFrame from "../components/PageFrame";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageFrame>
      <Container
        size={1280}
        py={72}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Stack gap={42}>
          <Stack gap={16} maw={900}>
            <Title
              order={1}
              style={{
                fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                fontSize: "clamp(42px, 6vw, 78px)",
                lineHeight: 1,
                letterSpacing: 6,
                fontWeight: 500,
              }}
            >
              {t.aboutTitle}
            </Title>

            <Text c="gray.4" size="lg" lh={1.8}>
              {t.aboutDescription}
            </Text>
          </Stack>

          <Divider color="rgba(255,255,255,0.1)" />

          <Stack gap={32} maw={900}>
            <Stack gap={16}>
              <Title
                order={2}
                style={{
                  fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                  fontSize: "clamp(28px, 4vw, 48px)",
                  lineHeight: 1,
                  letterSpacing: 4,
                  fontWeight: 500,
                  color: "#ddd7ce",
                }}
              >
                {t.aboutMission}
              </Title>

              <Text c="gray.4" size="lg" lh={1.8}>
                {t.aboutMissionText}
              </Text>
            </Stack>

            <Divider color="rgba(255,255,255,0.1)" />

            <Stack gap={16}>
              <Title
                order={2}
                style={{
                  fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                  fontSize: "clamp(28px, 4vw, 48px)",
                  lineHeight: 1,
                  letterSpacing: 4,
                  fontWeight: 500,
                  color: "#ddd7ce",
                }}
              >
                {t.aboutWhat}
              </Title>

              <Text
                c="gray.4"
                size="lg"
                lh={1.8}
                style={{ whiteSpace: "pre-line" }}
              >
                {t.aboutWhatText}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </PageFrame>
  );
}
