import { Group, Button } from "@mantine/core";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Group gap={4}>
      <Button
        size="sm"
        radius={0}
        variant={language === "en" ? "filled" : "outline"}
        onClick={() => setLanguage("en")}
        styles={{
          root: {
            height: "clamp(32px, 5vw, 36px)",
            lineHeight: "clamp(32px, 5vw, 36px)",
            background: language === "en" ? "#ece5d8" : "transparent",
            color: language === "en" ? "#111111" : "#bbb4aa",
            border: "1px solid rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            letterSpacing: 1,
            padding: "0 clamp(8px, 2vw, 12px)",
            fontSize: "clamp(10px, 1.5vw, 12px)",
          },
        }}
      >
        ENG
      </Button>
      <Button
        size="sm"
        radius={0}
        variant={language === "et" ? "filled" : "outline"}
        onClick={() => setLanguage("et")}
        styles={{
          root: {
            height: "clamp(32px, 5vw, 36px)",
            lineHeight: "clamp(32px, 5vw, 36px)",
            background: language === "et" ? "#ece5d8" : "transparent",
            color: language === "et" ? "#111111" : "#bbb4aa",
            border: "1px solid rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            letterSpacing: 1,
            padding: "0 clamp(8px, 2vw, 12px)",
            fontSize: "clamp(10px, 1.5vw, 12px)",
          },
        }}
      >
        EST
      </Button>
    </Group>
  );
}
