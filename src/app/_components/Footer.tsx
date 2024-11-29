import CreatorCard from "./Creater";
import { ModeToggle } from "./theme-toggle";

export default function Footer() {
  return (
    <footer className="flex h-24 items-center gap-6 border-t bg-background/5 px-8 text-sm text-muted-foreground mt-36">
      <div className="flex justify-between items-center w-full">
        <div className="flex gap-4 items-center">
        <h2 className="text-foreground text-lg font-bold">FYNC</h2>
        <ModeToggle />
        </div>
        <CreatorCard />
      </div>
    </footer>
  );
}
