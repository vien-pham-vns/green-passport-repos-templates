import { IconDashboard } from "@tabler/icons-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: any;
  badge?: string | number;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Portal",
    href: "/",
    icon: IconDashboard,
  },
];

export const userMenuItems = [
  {
    title: "Profile",
    href: "/profile",
  },
  {
    title: "Logout",
    href: "/logout",
  },
];
