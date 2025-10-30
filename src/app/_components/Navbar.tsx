"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signIn } from "next-auth/react";
import { ArrowLeftIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { UserNav } from "./user-nav";
import { Uploader } from "./Uploader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import SearchBox from "./SearchBox";
import { UploadDropdown } from "./UploadDropdown";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const isImageView = pathname.startsWith("/bkt/");

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 px-8 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center gap-3">
        <div className="w-full">
          {isImageView ? (
            <Button
              variant="outline"
              className="rounded-full bg-accent px-4 py-3"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>back</span>
            </Button>
          ) : (
            <SearchBox />
          )}
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          {session ? (
            <div className="flex h-fit w-fit items-center justify-center gap-4">
              <UploadDropdown />
              <UserNav />
              <Uploader />
            </div>
          ) : (
            <Button onClick={() => signIn()}>Sign in</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
