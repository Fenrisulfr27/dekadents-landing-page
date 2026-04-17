import {
  IconBrush,
  IconFrame,
  IconSkull,
  IconUsers,
} from "@tabler/icons-react";
import type { TablerIconsProps } from "@tabler/icons-react";

export type IconComponent = React.ComponentType<TablerIconsProps>;

export type Feature = {
  icon: IconComponent;
  title: string;
  text: string;
};

export const navItems = ["Home", "About", "Gallery", "Rules", "Join"];

export const features: Feature[] = [
  {
    icon: IconBrush,
    title: "Art & Feedback",
    text: "Share your work and get constructive feedback from fellow artists.",
  },
  {
    icon: IconFrame,
    title: "Inspiration",
    text: "Daily inspiration, moodboards, resources, and creative discussions.",
  },
  {
    icon: IconUsers,
    title: "Community",
    text: "Friendly and active community of artists from around the world.",
  },
  {
    icon: IconSkull,
    title: "Exclusive Roles",
    text: "Unlock roles, channels, and perks by being an active member.",
  },
];