"use client";

import { useRouter } from "next/navigation";
import { UploadButton } from "~/utils/uploadthing";

export default function Uploader() {
  const router = useRouter();
  return (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={() => {
        router.refresh();
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
