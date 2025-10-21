import Link from "next/link";
import { Button } from "~/components/ui/button";
import { UserNav } from "./user-nav";
import { auth, signIn } from "~/server/auth";
import { Uploader } from "./Uploader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import SearchBox from "./SearchBox";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 px-8 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70">
      <div className="flex h-14 items-center gap-3">
        <div className="w-full">
          <SearchBox />
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          {session ? (
            <div className="flex h-fit w-fit items-center justify-center gap-4">
              <UserNav />
              <Uploader />
            </div>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn();
              }}
            >
              <Button type="submit">Sign in</Button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
}
