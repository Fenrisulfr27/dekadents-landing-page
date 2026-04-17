import { Box, Stack, Text, ThemeIcon } from "@mantine/core";
import type { Feature } from "../data/features";

type Props = {
  feature: Feature;
};

export function FeatureCard({ feature }: Props) {
  const Icon = feature.icon;

  return (
    <Box
      style={{
        minHeight: 238,
        display: "flex",
        justifyContent: "center",
        padding: "42px 28px 28px",
      }}
    >
      <Stack align="center" gap="md" maw={230}>
        <ThemeIcon variant="transparent" color="gray" size={44}>
          <Icon size={28} stroke={1.4} />
        </ThemeIcon>

        <Text
          ta="center"
          style={{
            color: "#d5d0c7",
            textTransform: "uppercase",
            letterSpacing: 3.8,
            fontSize: 19,
          }}
        >
          {feature.title}
        </Text>

        <Text ta="center" c="gray.5" size="md" lh={1.8}>
          {feature.text}
        </Text>
      </Stack>
    </Box>
  );
}
