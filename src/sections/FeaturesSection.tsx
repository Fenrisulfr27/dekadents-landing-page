import { Box, Card, SimpleGrid } from "@mantine/core";
import { SectionContainer } from "../components/SectionContainer";
import { FeatureCard } from "../components/FeatureCard";
import { features } from "../data/features";

export function FeaturesSection() {
  return (
    <SectionContainer
      pt={{ base: 32, sm: 36, md: 42 }}
      pb={0}
      px={{ base: 0, sm: 20, md: 40 }}
    >
      <Card
        radius={0}
        padding={0}
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 4 }} spacing={0}>
          {features.map((feature, index) => (
            <Box
              key={feature.titleKey}
              style={{
                borderLeft:
                  index === 0 ? "none" : "1px solid rgba(255,255,255,0.06)",
                borderTop:
                  index < 2 ? "none" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <FeatureCard feature={feature} />
            </Box>
          ))}
        </SimpleGrid>
      </Card>
    </SectionContainer>
  );
}
