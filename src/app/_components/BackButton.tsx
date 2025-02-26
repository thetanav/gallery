"use client";

import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "~/components/ui/button";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button variant="outline" className="m-3" onClick={() => router.back()}>
      <ArrowLeftIcon className="h-5 w-5" />
      <span>back</span>
    </Button>
  );
}
