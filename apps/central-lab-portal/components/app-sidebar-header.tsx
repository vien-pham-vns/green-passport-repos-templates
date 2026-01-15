"use client";

import Link from "next/link";
import { User2 } from "lucide-react";

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function AppSidebarHeader() {
  const { state } = useSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            render={<Link href="/" />}
            className="items-center"
          >
            <div
              className={`flex items-center justify-center rounded-lg bg-primary text-primary-foreground ${
                state === "collapsed"
                  ? "aspect-square size-10"
                  : "aspect-square size-8"
              }`}
            >
              <User2 className={state === "collapsed" ? "size-6" : "size-4"} />
            </div>
            {state !== "collapsed" && (
              <div className="flex flex-col flex-1 text-left text-base leading-tight justify-center">
                <span className="truncate font-semibold">Central Lab</span>
                <span className="truncate text-sm">Portal</span>
              </div>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
