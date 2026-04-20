import { Box, Button, Divider, Group, Stack, Text } from "@mantine/core";
import { SectionContainer } from "../components/SectionContainer";
import { IconBrandDiscord } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export function CTASection() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <SectionContainer
      pt={{ base: 32, sm: 36, md: 42 }}
      pb={{ base: 40, sm: 48, md: 58 }}
    >
      <Box
        style={{
          position: "relative",
          minHeight: "clamp(220px, 50vw, 290px)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)), radial-gradient(circle at center, rgba(255,255,255,0.02), transparent 45%)",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          className="cta-image-hidden-mobile"
          src="/assets/dead-tree-left.svg"
          alt=""
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: "clamp(120px, 25vw, 320px)",
            maxWidth: "28vw",
            opacity: 0.86,
            pointerEvents: "none",
            userSelect: "none",
            display: "none",
          }}
        />

        <Box
          component="img"
          className="cta-image-hidden-mobile"
          src="/assets/castle-right.png"
          alt=""
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: "clamp(120px, 25vw, 330px)",
            maxWidth: "30vw",
            opacity: 0.84,
            pointerEvents: "none",
            userSelect: "none",
            display: "none",
          }}
        />

        <Stack
          align="center"
          justify="center"
          gap="lg"
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "inherit",
            padding: "20px 16px",
          }}
        >
          <Group gap="md" align="center" wrap="nowrap" justify="center">
            <Divider color="rgba(255,255,255,0.14)" w={60} visibleFrom="sm" />
            <Text
              ta="center"
              style={{
                color: "#ddd7ce",
                letterSpacing: 6,
                textTransform: "uppercase",
                fontSize: "clamp(20px, 5vw, 54px)",
                lineHeight: 1.2,
              }}
            >
              {t.enterDecadence}
            </Text>
            <Divider color="rgba(255,255,255,0.14)" w={60} visibleFrom="sm" />
          </Group>

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
                color: "#111111",
                border: "1px solid rgba(255,255,255,0.14)",
                textTransform: "uppercase",
                letterSpacing: 2,
                minWidth: "clamp(200px, 60vw, 270px)",
                height: "clamp(40px, 8vw, 52px)",
              },
            }}
          >
            {t.joinOurDiscord}
          </Button>
        </Stack>
      </Box>
    </SectionContainer>
  );
}
