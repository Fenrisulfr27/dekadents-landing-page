import React from "react";
import { Container } from "@mantine/core";
import type { ContainerProps } from "@mantine/core";

type SectionContainerProps = Omit<ContainerProps, "size" | "style"> & {
  children: React.ReactNode;
};

export function SectionContainer({
  children,
  pt = { base: 88, sm: 100, md: 120 },
  pb = { base: 40, sm: 52, md: 72 },
  ...props
}: SectionContainerProps) {
  return (
    <Container
      size={1280}
      pt={pt}
      pb={pb}
      px={{ base: 16, sm: 20, md: 40 }}
      style={{ position: "relative", zIndex: 1 }}
      {...props}
    >
      {children}
    </Container>
  );
}
