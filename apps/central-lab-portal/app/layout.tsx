import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import ProviderLayout from "./provider-layout";
import ConfigWrapper from "@/providers/config-wrapper";
import LocaleWrapper from "@/providers/locale-wrapper";

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
        <Suspense fallback={<>Loading...</>}>
          <ConfigWrapper>
            <LocaleWrapper>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ProviderLayout>{children}</ProviderLayout>
              </ThemeProvider>
            </LocaleWrapper>
          </ConfigWrapper>
        </Suspense>
      </body>
    </html>
  );
}
