import React from "react";
import { Helmet } from "react-helmet-async";
import { Stack, Text, Title } from "@mantine/core";
import PageFrame from "../components/PageFrame";
import { SectionContainer } from "../components/SectionContainer";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export default function RulesPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <>
      <Helmet>
        <title>Reeglid — Dekadents</title>
        <meta
          name="description"
          content="Dekadentsi serveri reeglid ja juhised. Tutvu reeglitega enne liitumist, et tagada positiivne ja lugupidav loominguline keskkond."
        />
        <meta property="og:title" content="Reeglid — Dekadents" />
        <meta
          property="og:description"
          content="Dekadentsi serveri reeglid ja juhised loomingulise kogukonna jaoks."
        />
        <meta property="og:url" content="https://dekadents.eu/rules" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://dekadents.eu/rules" />
      </Helmet>
      <PageFrame>
        <SectionContainer>
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
        </SectionContainer>
      </PageFrame>
    </>
  );
}
