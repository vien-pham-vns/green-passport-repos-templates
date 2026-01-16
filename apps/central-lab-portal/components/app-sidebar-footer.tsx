"use client";

import Link from "next/link";
import {
  ChevronUp,
  LogOut,
  Settings as SettingsIcon,
  User as UserIcon,
} from "lucide-react";

import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userMenuItems } from "@/data/navigation";
import { User } from "@/types/user";
import { logout } from "@/app/actions/auth";
import { type Route } from "next";

interface AppSidebarFooterProps {
  user?: User;
}

export function AppSidebarFooter({ user }: AppSidebarFooterProps) {
  const { state } = useSidebar();

  const handleLogout = async () => {
    await logout();
  };

  const defaultUser = {
    name: user?.name || "Demo User",
    email: user?.email || "demo@example.com",
    avatar: user?.avatar || user?.image || "",
  };

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem className="w-full">
          <DropdownMenu>
            <DropdownMenuTrigger
              render={
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground items-center"
                />
              }
            >
              <Avatar
                className={
                  state === "collapsed"
                    ? "h-10 w-10 rounded-lg"
                    : "h-8 w-8 rounded-lg"
                }
              >
                <AvatarImage src={defaultUser.avatar} alt={defaultUser.name} />
                <AvatarFallback className="rounded-lg">
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
              {state !== "collapsed" && (
                <>
                  <div className="flex flex-col flex-1 text-left text-base leading-tight justify-center">
                    <span className="truncate font-semibold">
                      {defaultUser.name}
                    </span>
                    <span className="truncate text-sm">
                      {defaultUser.email}
                    </span>
                  </div>
                  <ChevronUp className="ml-auto size-4" />
                </>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              side="bottom"
              align="end"
              sideOffset={4}
            >
              {userMenuItems.map((item) =>
                item.title === "Logout" ? (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={handleLogout}
                    className="cursor-pointer"
                  >
                    <LogOut className="size-4" />
                    {item.title}
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem
                    key={item.href}
                    render={<Link href={item.href as Route} />}
                  >
                    {item.title === "Profile" && (
                      <UserIcon className="size-4" />
                    )}
                    {item.title === "Account Settings" && (
                      <SettingsIcon className="size-4" />
                    )}
                    {item.title}
                  </DropdownMenuItem>
                ),
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
