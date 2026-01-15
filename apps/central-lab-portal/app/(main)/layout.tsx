import React from "react";

import { getCurrentUser } from "@/app/actions/auth";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AppSidebar } from "@/components/app-sidebar";
import { PathBreadcrumbs } from "@/components/path-breadcrumbs";
import { UserNav } from "@/components/user-nav";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: React.PropsWithChildren) {
  // Auth check is handled by proxy.ts - this only runs for authenticated users
  const user = await getCurrentUser();
  console.log("user", user);
  if (!user) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between border-b">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <PathBreadcrumbs />
          </div>
          <div className="flex items-center gap-3 px-4">
            <ModeToggle />
            <UserNav user={user} />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
