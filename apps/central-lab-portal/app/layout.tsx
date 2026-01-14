import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import ProviderLayout from "./provider-layout";

const poppins = Poppins({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: "Central Lab Portal",
  description: "Central Laboratory Portal for Quality Control",
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<LayoutProps>) {
  return (
    <html
      lang="en"
      translate="no"
      suppressHydrationWarning
      className={poppins.variable}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Suspense fallback={<>Loading...</>}>
            <ProviderLayout>{children}</ProviderLayout>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
