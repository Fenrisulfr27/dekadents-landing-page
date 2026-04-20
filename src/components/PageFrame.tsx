import React, { useState } from "react";
import {
  AppShell,
  Box,
  Button,
  Container,
  Group,
  Text,
  Drawer,
  Stack,
  Divider,
} from "@mantine/core";
import { IconBrandDiscord, IconMenu2, IconX } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { navItems } from "../data/features";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "../context/LanguageContext";
import { translations } from "../data/translations";

type Props = {
  children: React.ReactNode;
};

export default function PageFrame({ children }: Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  const navLinks = navItems.map((item) => ({
    item,
    href:
      item === "home"
        ? "/"
        : item === "about"
          ? "/about"
          : item === "gallery"
            ? "/gallery"
            : item === "rules"
              ? "/rules"
              : "/",
    label: t[item],
  }));

  const discordButtonStyles = {
    root: {
      color: "#ece7de",
      borderColor: "rgba(255,255,255,0.18)",
      textTransform: "uppercase",
      letterSpacing: 1,
      background: "rgba(255,255,255,0.01)",
    },
  };

  return (
    <Box
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#050505",
      }}
    >
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
          header={{ height: { base: 64, sm: 78 } }}
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
            <Container size={1280} h="100%" px={{ base: 16, sm: 20 }}>
              <Group justify="space-between" h="100%">
                <Box
                  component="img"
                  src="/assets/logo.png"
                  alt="Dekadents logo"
                  style={{
                    width: 50,
                    height: 50,
                    objectFit: "contain",
                  }}
                />

                <Group gap={38} visibleFrom="md">
                  {navLinks.map(({ item, href, label }) => (
                    <Text
                      key={item}
                      component={Link}
                      to={href}
                      onClick={() => setMobileMenuOpen(false)}
                      style={{
                        color: "#bbb4aa",
                        textTransform: "uppercase",
                        letterSpacing: 3,
                        fontSize: 13,
                        cursor: "pointer",
                        textDecoration: "none",
                      }}
                    >
                      {label}
                    </Text>
                  ))}
                </Group>

                <Group gap="md">
                  <LanguageSwitcher />
                  <Button
                    component="a"
                    href="https://discord.gg/wCykm7AFNE"
                    target="_blank"
                    radius={0}
                    variant="outline"
                    hiddenFrom="sm"
                    leftSection={<IconBrandDiscord size={16} />}
                    size="xs"
                    styles={{
                      ...discordButtonStyles,
                      root: {
                        ...discordButtonStyles.root,
                        padding: "6px 12px",
                      },
                    }}
                  >
                    {t.joinDiscord}
                  </Button>
                  <Button
                    component="a"
                    href="https://discord.gg/wCykm7AFNE"
                    target="_blank"
                    radius={0}
                    variant="outline"
                    visibleFrom="sm"
                    leftSection={<IconBrandDiscord size={16} />}
                    styles={discordButtonStyles}
                  >
                    {t.joinDiscord}
                  </Button>
                  <Button
                    hiddenFrom="md"
                    variant="subtle"
                    color="gray"
                    onClick={() => setMobileMenuOpen(true)}
                    style={{
                      color: "#bbb4aa",
                    }}
                    p={0}
                    w={36}
                    h={36}
                  >
                    <IconMenu2 size={20} />
                  </Button>
                </Group>
              </Group>
            </Container>
          </AppShell.Header>

          <Drawer
            opened={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            title=""
            padding="md"
            styles={{
              content: {
                background: "#050505",
                borderLeft: "1px solid rgba(255,255,255,0.08)",
              },
              header: {
                borderBottom: "1px solid rgba(255,255,255,0.08)",
              },
            }}
          >
            <Stack gap="md" pt="md">
              <Group justify="space-between" mb="md">
                <Text size="sm" fw={500} c="gray.4">
                  {t.menu}
                </Text>
                <Button
                  variant="subtle"
                  color="gray"
                  onClick={() => setMobileMenuOpen(false)}
                  p={0}
                  w={32}
                  h={32}
                >
                  <IconX size={20} />
                </Button>
              </Group>
              <Divider color="rgba(255,255,255,0.1)" />
              {navLinks.map(({ item, href, label }) => (
                <Text
                  key={item}
                  component={Link}
                  to={href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    color: "#bbb4aa",
                    textTransform: "uppercase",
                    letterSpacing: 2,
                    fontSize: 14,
                    cursor: "pointer",
                    textDecoration: "none",
                    padding: "8px 0",
                  }}
                >
                  {label}
                </Text>
              ))}
            </Stack>
          </Drawer>

          <AppShell.Main>{children}</AppShell.Main>
        </AppShell>
      </Box>
    </Box>
  );
}
