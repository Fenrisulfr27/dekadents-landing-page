import React from "react";
import { Stack, Text, Title, Divider } from "@mantine/core";
import PageFrame from "../components/PageFrame";
import { SectionContainer } from "../components/SectionContainer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageFrame>
      <SectionContainer>
        <Stack gap="lg">
          <Stack gap="md" maw={900}>
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
              {t.aboutTitle}
            </Title>

            <Text c="gray.4" size="md" lh={1.8}>
              {t.aboutDescription}
            </Text>
          </Stack>

          <Divider color="rgba(255,255,255,0.1)" />

          <Stack gap="lg" maw={900}>
            <Stack gap="md">
              <Title
                order={2}
                style={{
                  fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                  fontSize: "clamp(24px, 5vw, 48px)",
                  lineHeight: 1.1,
                  letterSpacing: 3,
                  fontWeight: 500,
                  color: "#ddd7ce",
                }}
              >
                {t.aboutMission}
              </Title>

              <Text c="gray.4" size="md" lh={1.8}>
                {t.aboutMissionText}
              </Text>
            </Stack>

            <Divider color="rgba(255,255,255,0.1)" />

            <Stack gap="md">
              <Title
                order={2}
                style={{
                  fontFamily: '"Cinzel", "Cormorant Garamond", serif',
                  fontSize: "clamp(24px, 5vw, 48px)",
                  lineHeight: 1.1,
                  letterSpacing: 3,
                  fontWeight: 500,
                  color: "#ddd7ce",
                }}
              >
                {t.aboutWhat}
              </Title>

              <Text
                c="gray.4"
                size="md"
                lh={1.8}
                style={{ whiteSpace: "pre-line" }}
              >
                {t.aboutWhatText}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </SectionContainer>
    </PageFrame>
  );
}
