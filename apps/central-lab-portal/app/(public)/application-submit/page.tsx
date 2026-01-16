"use client";

import dynamic from "next/dynamic";

const CentralLabApplicationForm = dynamic(
  () => import("@/features/application-submit-form"),
  {
    ssr: false,
  },
);

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* TODO: Utilize React Activity comoponent to prevent child component rerender */}
      <CentralLabApplicationForm />
    </main>
  );
}
