import { Group, Button } from "@mantine/core";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Group gap={4}>
      <Button
        size="md"
        radius={0}
        variant={language === "en" ? "filled" : "outline"}
        onClick={() => setLanguage("en")}
        styles={{
          root: {
            height: 36,
            lineHeight: 36,
            background: language === "en" ? "#ece5d8" : "transparent",
            color: language === "en" ? "#111111" : "#bbb4aa",
            border: "1px solid rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            letterSpacing: 1,
            padding: "0 12px",
            fontSize: 12,
          },
        }}
      >
        ENG
      </Button>
      <Button
        size="md"
        radius={0}
        variant={language === "et" ? "filled" : "outline"}
        onClick={() => setLanguage("et")}
        styles={{
          root: {
            height: 36,
            lineHeight: 36,
            background: language === "et" ? "#ece5d8" : "transparent",
            color: language === "et" ? "#111111" : "#bbb4aa",
            border: "1px solid rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            letterSpacing: 1,
            padding: "0 12px",
            fontSize: 12,
          },
        }}
      >
        EST
      </Button>
    </Group>
  );
}
