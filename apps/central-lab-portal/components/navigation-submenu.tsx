"use client";

import Link from "next/link";
import { type Route } from "next";
import {
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuBadge,
} from "@/components/ui/sidebar";
import { NavigationItem } from "@/data/navigation";

interface NavigationSubmenuProps {
  items: NavigationItem[];
  isCurrentPage: (href: string) => boolean;
  onItemClick?: (e: React.MouseEvent, item: NavigationItem) => void;
}

export function NavigationSubmenu({
  items,
  isCurrentPage,
  onItemClick,
}: NavigationSubmenuProps) {
  return (
    <SidebarMenuSub>
      {items.map((child) => (
        <SidebarMenuSubItem key={child.href}>
          <SidebarMenuSubButton
            render={<Link href={child.href as Route} />}
            isActive={isCurrentPage(child.href)}
            className="h-10"
            onClick={(e) => {
              if (isCurrentPage(child.href)) {
                e.preventDefault();
              }
              onItemClick?.(e, child);
            }}
          >
            <span>{child.title}</span>
            {child.badge && <SidebarMenuBadge>{child.badge}</SidebarMenuBadge>}
          </SidebarMenuSubButton>
        </SidebarMenuSubItem>
      ))}
    </SidebarMenuSub>
  );
}
