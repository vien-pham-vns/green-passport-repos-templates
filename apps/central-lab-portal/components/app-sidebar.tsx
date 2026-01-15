"use client";

import { Sidebar } from "@/components/ui/sidebar";
import { AppSidebarHeader } from "@/components/app-sidebar-header";
import { AppSidebarMenu } from "@/components/app-sidebar-menu";
import { AppSidebarFooter } from "@/components/app-sidebar-footer";
import { User } from "@/types/user";

interface AppSidebarProps {
  user?: User;
}

export function AppSidebar({ user }: AppSidebarProps) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarMenu />
      <AppSidebarFooter user={user} />
    </Sidebar>
  );
}
