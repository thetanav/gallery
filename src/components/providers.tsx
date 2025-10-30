"use client";

import { UploadProvider } from "~/lib/upload-context";

export function Providers({ children }: { children: React.ReactNode }) {
  return <UploadProvider>{children}</UploadProvider>;
}
