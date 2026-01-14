import React from "react";

export default function LoginLayout({ children }: React.PropsWithChildren) {
  // Auth redirect is handled by proxy.ts - authenticated users are redirected before reaching here
  return <>{children}</>;
}
