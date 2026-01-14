"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbConfig {
  label: string;
  href?: string;
}

// You can customize this mapping based on your routes
const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  settings: "Settings",
  users: "Users",
  products: "Products",
  // Add more route labels as needed
};

export function PathBreadcrumbs() {
  const pathname = usePathname();

  // Split pathname into segments, filter empty strings
  const segments = pathname.split("/").filter(Boolean);

  // Don't render breadcrumbs on home page
  if (segments.length === 0) {
    return null;
  }

  // Build breadcrumb items from pathname segments
  const breadcrumbs: BreadcrumbConfig[] = segments.map((segment, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

    return { label, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <>
              <BreadcrumbSeparator key={`sep-${index}`} />
              <BreadcrumbItem key={crumb.href}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href!}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
