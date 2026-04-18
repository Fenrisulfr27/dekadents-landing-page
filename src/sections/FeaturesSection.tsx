import { Box, Card, Container, SimpleGrid } from "@mantine/core";
import { FeatureCard } from "../components/FeatureCard";
import { features } from "../data/features";

export function FeaturesSection() {
  return (
    <Container size={1280} mt={42} px={0}>
      <Card
        radius={0}
        padding={0}
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={0}>
          {features.map((feature, index) => (
            <Box
              key={feature.titleKey}
              style={{
                borderLeft: index === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <FeatureCard feature={feature} />
            </Box>
          ))}
        </SimpleGrid>
      </Card>
    </Container>
  );
}