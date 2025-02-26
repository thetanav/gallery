"use client";

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
      className="w-[90vh] rounded-lg border bg-background p-3 shadow"
      ref={dialogRef}
      onClose={onDismiss}
    >
      {children}
    </dialog>
  );
}
