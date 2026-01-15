import { redirect } from "next/navigation";

import { getCurrentUserOrNull } from "@/app/actions/auth";

export default async function RootPage() {
  const user = await getCurrentUserOrNull();

  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
