import React from "react";
import { Container, Stack, Text, Title } from "@mantine/core";
import PageFrame from "../components/PageFrame";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function RulesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <PageFrame>
      <Container
        size={1280}
        pt={{ base: 88, sm: 100, md: 120 }}
        pb={{ base: 40, sm: 52, md: 72 }}
        px={{ base: 16, sm: 20, md: 40 }}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Stack gap="xl">
          <Stack gap="md" maw={760}>
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
              {t.rulesTitle}
            </Title>
          </Stack>

          <Stack gap="lg" maw={900}>
            <Stack gap="md">
              <Text
                style={{
                  color: "#cfc8be",
                  textTransform: "uppercase",
                  letterSpacing: 2.5,
                  fontSize: "clamp(12px, 2vw, 14px)",
                }}
              >
                ::
              </Text>
              <Text c="gray.4" size="md" lh={1.8}>
                {t.rule1}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </PageFrame>
  );
}
