import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const fontSans = Figtree({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Central Lab Portal",
  description: "Central admin users",
  generator: "vien-pham-vns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
