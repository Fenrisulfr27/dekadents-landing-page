import { Group, Button } from "@mantine/core";
import { useLanguage } from "../context/LanguageContext";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <Group gap={4}>
      <Button
        size="xs"
        radius={0}
        variant={language === "en" ? "filled" : "subtle"}
        onClick={() => setLanguage("en")}
        styles={{
          root: {
            background: language === "en" ? "#ece5d8" : "transparent",
            color: language === "en" ? "#111111" : "#bbb4aa",
            border: "1px solid rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            letterSpacing: 1,
            padding: "4px 10px",
            height: "auto",
            fontSize: 11,
          },
        }}
      >
        ENG
      </Button>
      <Button
        size="xs"
        radius={0}
        variant={language === "et" ? "filled" : "subtle"}
        onClick={() => setLanguage("et")}
        styles={{
          root: {
            background: language === "et" ? "#ece5d8" : "transparent",
            color: language === "et" ? "#111111" : "#bbb4aa",
            border: "1px solid rgba(255,255,255,0.18)",
            textTransform: "uppercase",
            letterSpacing: 1,
            padding: "4px 10px",
            height: "auto",
            fontSize: 11,
          },
        }}
      >
        EST
      </Button>
    </Group>
  );
}
