"use client";

import { useMemo } from "react";

import { createAppTheme, defaultTheme } from "./create-theme";
import ThemeProviderServer from "./theme-provider-server";

export function ThemeProviderClient({
  children,
  fontName,
}: {
  children: React.ReactNode;
  fontName?: string;
}) {
  const theme = useMemo(() => {
    if (!fontName) return defaultTheme;

    return createAppTheme({
      typography: {
        fontFamily: fontName,
        fontSize: 16,
      },
    });
  }, [fontName]);

  return <ThemeProviderServer theme={theme}>{children}</ThemeProviderServer>;
}
