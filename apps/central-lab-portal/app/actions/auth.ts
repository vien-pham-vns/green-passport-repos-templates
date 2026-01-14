"use server";

import { cache } from "react";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

import { clearAuthCookies, getAuthToken } from "@/lib/auth";
import { fetchMe, getDummyUser } from "@/utils/server-api";
import { User } from "@/types/user";

/**
 * Clear auth cookies and redirect to login
 */
export const logout = async function () {
  "use server";
  await clearAuthCookies();
  // Revalidate user cache
  revalidateTag("user-me", { expire: 0 });
  redirect("/login");
};

/**
 * Redirect to login (alias for logout)
 */
export const redirectToLogin = async function () {
  await logout();
};

/**
 * Get current authenticated user
 *
 * Wrapped with React cache() to deduplicate calls within a single request.
 * Even if called multiple times in layout + page, it only executes once.
 */
export const getCurrentUser = cache(async (): Promise<User> => {
  const token = await getAuthToken();

  let user: User | null;
  if (!token) {
    console.debug("No auth token, redirecting to login");
    redirect("/login");
  }

  // For development: use dummy user
  // TODO: Replace with real API call in production
  user = getDummyUser();
  // END TODO

  // user = await fetchMe();

  // if (!user) {
  //   // Token exists but user fetch failed - clear cookies and redirect
  //   console.debug("Invalid auth token, redirecting to login");
  //   redirect("/login" as any);
  // }

  return user;
});

/**
 * Get current user without redirecting
 * Returns null if not authenticated
 */
export async function getCurrentUserOrNull(): Promise<User | null> {
  const token = await getAuthToken();

  if (!token) {
    return null;
  }

  // For development: use dummy user
  if (process.env.NODE_ENV === "development") {
    return getDummyUser();
  }

  return await fetchMe();
}
