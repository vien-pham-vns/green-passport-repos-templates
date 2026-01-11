import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";

import { ThemeProviderClient } from "./theme-provider-client";

export default function ThemeRegistry({
  children,
  fontName,
}: {
  children: React.ReactNode;
  fontName?: string;
}) {
  return (
    <>
      <InitColorSchemeScript attribute="class" />
      <ThemeProviderClient fontName={fontName}>{children}</ThemeProviderClient>
    </>
  );
}
