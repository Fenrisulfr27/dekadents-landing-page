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
        py={72}
        style={{ position: "relative", zIndex: 1 }}
      >
        <Stack gap={42}>
          <Stack gap={16} maw={760}>
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
              {t.rulesTitle}
            </Title>
          </Stack>

          <Stack gap={32} maw={900}>
            <Stack gap={16}>
              <Text
                style={{
                  color: "#cfc8be",
                  textTransform: "uppercase",
                  letterSpacing: 2.5,
                  fontSize: 14,
                }}
              >
                ::
              </Text>
              <Text c="gray.4" size="lg" lh={1.8}>
                {t.rule1}
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </PageFrame>
  );
}
