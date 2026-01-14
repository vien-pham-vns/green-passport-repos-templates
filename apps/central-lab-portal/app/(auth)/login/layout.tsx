import { redirect } from "next/navigation";
import React from "react";

import { getAuthToken } from "@/lib/auth";

export default async function LoginLayout({
  children,
}: React.PropsWithChildren) {
  const token = await getAuthToken();

  // If already logged in, redirect to portal
  if (token) {
    redirect("/");
  }

  return <>{children}</>;
}
