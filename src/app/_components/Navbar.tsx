import Link from "next/link";
import { Button } from "~/components/ui/button";
import { UserNav } from "./user-nav";
import { auth, signIn } from "~/server/auth";
import { ModeToggle } from "./theme-toggle";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <div className="flex">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <span className="text-xl font-black">FYNC</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium text-foreground/70">
            <Link href="/docs">Docs</Link>
            <Link href="/components">Components</Link>
            <Link href="/examples">Examples</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          {session ? (
            <UserNav />
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
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
