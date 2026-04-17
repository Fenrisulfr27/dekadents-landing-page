import React from "react";
import { AppShell, Box, Button, Container, Group, Text } from "@mantine/core";
import { IconBrandDiscord } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { navItems } from "../data/features";

type Props = {
  children: React.ReactNode;
};

export default function PageFrame({ children }: Props) {
  return (
    <Box
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#050505",
      }}
    >
      {/* FIKSEERITUD HERO BACKGROUND */}
      <Box
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100vh",

          overflow: "hidden",

          boxShadow: "0 0 0 1px rgba(255,255,255,0.02) inset",
        }}
      >
        <Box
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#050505",
            backgroundImage: [
              "linear-gradient(180deg, rgba(8,8,8,0.88), rgba(3,3,3,0.98))",
              "url('/assets/hero.jpg')",
            ].join(", "),
            backgroundSize: "cover, cover",
            backgroundPosition: "center top, center top",
            backgroundRepeat: "no-repeat, no-repeat",
          }}
        />

        {/* sama glow / highlighted area */}
        <Box
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 56% 26%, rgba(255,255,255,0.08), rgba(255,255,255,0) 22%), radial-gradient(circle at 16% 80%, rgba(255,255,255,0.03), rgba(255,255,255,0) 18%), radial-gradient(circle at 86% 74%, rgba(255,255,255,0.025), rgba(255,255,255,0) 18%)",
            pointerEvents: "none",
          }}
        />
      </Box>

      {/* LEHE SISU */}
      <Box
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <AppShell
          padding={0}
          header={{ height: 78 }}
          styles={{
            main: {
              background: "transparent",
              color: "#efebe5",
            },
            header: {
              background: "transparent",
              borderBottom: "1px solid rgba(228, 212, 212, 0.03)",
            },
          }}
        >
          <AppShell.Header>
            <Container size={1280} h="100%">
              <Group justify="space-between" h="100%">
                <Box
                  component="img"
                  src="/assets/logo.png"
                  alt="Dekadents logo"
                  style={{
                    width: 70,
                    height: 70,
                    objectFit: "contain",
                  }}
                />

                <Group gap={38} visibleFrom="md">
                  {navItems.map((item) => {
                    const href =
                      item === "Home"
                        ? "/"
                        : item === "Gallery"
                          ? "/gallery"
                          : "/";

                    return (
                      <Text
                        key={item}
                        component={Link}
                        to={href}
                        style={{
                          color: "#bbb4aa",
                          textTransform: "uppercase",
                          letterSpacing: 3,
                          fontSize: 13,
                          cursor: "pointer",
                          textDecoration: "none",
                        }}
                      >
                        {item}
                      </Text>
                    );
                  })}
                </Group>

                <Button
                  radius={0}
                  variant="outline"
                  leftSection={<IconBrandDiscord size={16} />}
                  styles={{
                    root: {
                      color: "#ece7de",
                      borderColor: "rgba(255,255,255,0.18)",
                      textTransform: "uppercase",
                      letterSpacing: 2,
                      background: "rgba(255,255,255,0.01)",
                      paddingInline: 18,
                    },
                  }}
                >
                  Join Discord
                </Button>
              </Group>
            </Container>
          </AppShell.Header>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </Box>
    </Box>
  );
}
