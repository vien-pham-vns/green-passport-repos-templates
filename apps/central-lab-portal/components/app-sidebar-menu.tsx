"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarMenuAction,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { navigationItems, NavigationItem } from "@/data/navigation";
import { NavigationSubmenu } from "@/components/navigation-submenu";
import { type Route } from "next";

export function AppSidebarMenu() {
  const pathname = usePathname();
  const { state } = useSidebar();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [openPopovers, setOpenPopovers] = useState<Set<string>>(new Set());

  const getPathname = (url: string) => {
    try {
      return new URL(url, "http://localhost").pathname;
    } catch {
      return url.split("?")[0];
    }
  };

  const isCurrentPage = (href: string) => {
    const currentPath = getPathname(pathname);
    const targetPath = getPathname(href);
    return currentPath === targetPath;
  };

  const hasActiveChild = (item: NavigationItem): boolean => {
    if (!item.children) return false;
    return item.children.some(
      (child) =>
        isCurrentPage(child.href) || (child.children && hasActiveChild(child)),
    );
  };

  const isItemActive = (item: NavigationItem): boolean => {
    return isCurrentPage(item.href) || hasActiveChild(item);
  };

  const toggleItem = (href: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(href)) {
        newSet.delete(href);
      } else {
        newSet.add(href);
      }
      return newSet;
    });
  };

  const handleNavigationClick = (e: React.MouseEvent, item: NavigationItem) => {
    if (item.children && item.children.length > 0) {
      e.preventDefault();
      toggleItem(item.href);
    } else if (isCurrentPage(item.href)) {
      e.preventDefault();
    }
  };

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            {navigationItems.map((item) => {
              const isActive = isItemActive(item);
              const isOpen = openItems.has(item.href) || hasActiveChild(item);
              const hasChildren = item.children && item.children.length > 0;

              if (hasChildren) {
                const isPopoverOpen = openPopovers.has(item.href);

                return (
                  <Collapsible
                    key={item.href}
                    open={isOpen}
                    onOpenChange={() => toggleItem(item.href)}
                  >
                    <SidebarMenuItem>
                      {state === "collapsed" ? (
                        <Popover
                          open={isPopoverOpen}
                          onOpenChange={(open) => {
                            setOpenPopovers((prev) => {
                              const newSet = new Set(prev);
                              if (open) {
                                newSet.add(item.href);
                              } else {
                                newSet.delete(item.href);
                              }
                              return newSet;
                            });
                          }}
                        >
                          <PopoverTrigger
                            render={
                              <SidebarMenuButton
                                size="lg"
                                isActive={isActive}
                                onClick={(e) => handleNavigationClick(e, item)}
                                tooltip={{
                                  children: item.title,
                                  side: "right",
                                }}
                              />
                            }
                          >
                            <item.icon className="size-7" />
                            <span>{item.title}</span>
                          </PopoverTrigger>
                          <PopoverContent
                            side="right"
                            align="start"
                            sideOffset={8}
                            className="w-56 p-2"
                          >
                            <div className="text-sm font-medium mb-2 px-2">
                              {item.title}
                            </div>
                            <NavigationSubmenu
                              items={item.children!}
                              isCurrentPage={isCurrentPage}
                              onItemClick={() => {
                                setOpenPopovers((prev) => {
                                  const newSet = new Set(prev);
                                  newSet.delete(item.href);
                                  return newSet;
                                });
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      ) : (
                        <>
                          <SidebarMenuButton
                            size="lg"
                            isActive={isActive}
                            onClick={(e) => handleNavigationClick(e, item)}
                          >
                            <item.icon className="size-5" />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                          <CollapsibleTrigger
                            render={<SidebarMenuAction showOnHover />}
                          >
                            <ChevronRight
                              className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                            />
                            <span className="sr-only">Toggle</span>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <NavigationSubmenu
                              items={item.children!}
                              isCurrentPage={isCurrentPage}
                            />
                          </CollapsibleContent>
                        </>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              }

              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    size="lg"
                    render={<Link href={item.href as Route} />}
                    isActive={isActive}
                    onClick={(e) => {
                      if (isCurrentPage(item.href)) {
                        e.preventDefault();
                      }
                    }}
                    tooltip={
                      state === "collapsed"
                        ? {
                            children: item.title,
                            side: "right",
                          }
                        : undefined
                    }
                  >
                    <item.icon
                      className={state === "collapsed" ? "size-7" : "size-5"}
                    />
                    <span>{item.title}</span>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  );
}
