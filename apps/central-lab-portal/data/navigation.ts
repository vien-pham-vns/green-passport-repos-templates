import {
  IconDashboard,
  IconUsers,
  IconSettings,
  IconFileText,
  IconChartBar,
  IconPackage,
  IconShoppingCart,
} from "@tabler/icons-react";

export interface NavigationItem {
  title: string;
  href: string;
  icon: any;
  badge?: string | number;
  children?: NavigationItem[];
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: IconDashboard,
  },
  {
    title: "Applications",
    href: "/applications",
    icon: IconPackage,
  },
  {
    title: "Products",
    href: "/products",
    icon: IconPackage,
    badge: 12,
    children: [
      {
        title: "All Products",
        href: "/products",
        icon: IconPackage,
      },
      {
        title: "Categories",
        href: "/products/categories",
        icon: IconFileText,
      },
      {
        title: "Inventory",
        href: "/products/inventory",
        icon: IconChartBar,
      },
    ],
  },
  {
    title: "Orders",
    href: "/orders",
    icon: IconShoppingCart,
    children: [
      {
        title: "All Orders",
        href: "/orders",
        icon: IconShoppingCart,
      },
      {
        title: "Pending",
        href: "/orders/pending",
        icon: IconFileText,
        badge: 5,
      },
      {
        title: "Completed",
        href: "/orders/completed",
        icon: IconFileText,
      },
    ],
  },
  {
    title: "Users",
    href: "/profile",
    icon: IconUsers,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: IconSettings,
    children: [
      {
        title: "General",
        href: "/settings/general",
        icon: IconSettings,
      },
      {
        title: "Security",
        href: "/settings/security",
        icon: IconSettings,
      },
      {
        title: "Notifications",
        href: "/settings/notifications",
        icon: IconSettings,
      },
    ],
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
