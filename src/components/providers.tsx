"use client";

import { SessionProvider } from "next-auth/react";
import { UploadProvider } from "~/lib/upload-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UploadProvider>{children}</UploadProvider>
    </SessionProvider>
  );
}
