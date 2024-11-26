import CommandDemo from "./Command";

export default function Footer() {
  return (
    <footer className="flex h-24 items-center gap-6 border-t bg-background/5 px-8 text-sm text-muted-foreground">
      <div className="flex flex-col">
        <h2 className="text-foreground text-lg font-bold">&copy; FYNC</h2>
        <CommandDemo />
      </div>
    </footer>
  );
}
