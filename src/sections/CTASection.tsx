import {
  Box,
  Button,
  Container,
  Divider,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { IconBrandDiscord } from "@tabler/icons-react";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

export function CTASection() {
  const { language } = useLanguage();
  const t = translations[language];
  return (
    <Container size={1280} pt={42} pb={58}>
      <Box
        style={{
          position: "relative",
          minHeight: 290,
          borderTop: "1px solid rgba(255,255,255,0.04)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01)), radial-gradient(circle at center, rgba(255,255,255,0.02), transparent 45%)",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="/assets/dead-tree-left.svg"
          alt=""
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 320,
            maxWidth: "28vw",
            opacity: 0.86,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <Box
          component="img"
          src="/assets/castle-right.png"
          alt=""
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            width: 330,
            maxWidth: "30vw",
            opacity: 0.84,
            pointerEvents: "none",
            userSelect: "none",
          }}
        />

        <Stack
          align="center"
          justify="center"
          gap="xl"
          h={290}
          style={{ position: "relative", zIndex: 1 }}
        >
          <Group gap="md" align="center" wrap="nowrap">
            <Divider color="rgba(255,255,255,0.14)" w={90} visibleFrom="sm" />
            <Text
              ta="center"
              style={{
                color: "#ddd7ce",
                letterSpacing: 8,
                textTransform: "uppercase",
                fontSize: "clamp(28px, 4vw, 54px)",
                lineHeight: 1,
              }}
            >
              {t.enterDecadence}
            </Text>
            <Divider color="rgba(255,255,255,0.14)" w={90} visibleFrom="sm" />
          </Group>

          <Button
            component="a"
            href="https://discord.gg/wCykm7AFNE"
            target="_blank"
            size="lg"
            radius={0}
            leftSection={<IconBrandDiscord size={18} />}
            styles={{
              root: {
                background: "#ece5d8",
                color: "#111111",
                border: "1px solid rgba(255,255,255,0.14)",
                textTransform: "uppercase",
                letterSpacing: 3,
                minWidth: 270,
                height: 52,
              },
            }}
          >
            {t.joinOurDiscord}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
