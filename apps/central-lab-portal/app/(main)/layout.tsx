import { redirect } from "next/navigation";
import React from "react";

import { getAuthToken } from "@/lib/auth";
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

export default async function MainLayout({
  children,
}: React.PropsWithChildren) {
  const token = await getAuthToken();

  // If not logged in, redirect to login
  if (!token) {
    redirect("/login");
  }

  // Fetch current user
  const user = await getCurrentUser();

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
            <UserNav user={user} />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
