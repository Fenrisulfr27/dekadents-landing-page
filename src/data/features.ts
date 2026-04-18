import {
  IconBrush,
  IconFrame,
  IconSkull,
  IconUsers,
} from "@tabler/icons-react";
import type { TablerIconsProps } from "@tabler/icons-react";
import type { TranslationKey } from "./translations";

export type IconComponent = React.ComponentType<TablerIconsProps>;

export type Feature = {
  icon: IconComponent;
  titleKey: TranslationKey;
  descKey: TranslationKey;
};

export const navItems = ["home", "about", "gallery", "rules"] as const;

export const features: Feature[] = [
  {
    icon: IconBrush,
    titleKey: "artFeedback",
    descKey: "artFeedbackDesc",
  },
  {
    icon: IconFrame,
    titleKey: "inspiration",
    descKey: "inspirationDesc",
  },
  {
    icon: IconUsers,
    titleKey: "community",
    descKey: "communityDesc",
  },
  {
    icon: IconSkull,
    titleKey: "exclusiveRoles",
    descKey: "exclusiveRolesDesc",
  },
];
