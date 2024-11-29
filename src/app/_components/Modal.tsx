"use client";

import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef } from "react";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <dialog
      className="border bg-background pt-6 px-3 pb-3 shadow rounded-lg w-[90vw] sm:max-w-[80vh]"
      ref={dialogRef}
      onClose={onDismiss}
    >
      {children}
      <button
        onClick={onDismiss}
        className="absolute right-3 top-3"
      >
        <X className="h-4 w-4 opacity-70 hover:opacity-100" />
      </button>
    </dialog>
  );
}
