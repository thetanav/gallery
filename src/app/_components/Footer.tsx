import CreatorCard from "./Creater";

export default function Footer() {
  return (
    <footer className="flex h-24 items-center gap-6 border-t bg-background/5 px-8 text-sm text-muted-foreground mt-16">
      <div className="flex justify-between items-center w-full">
        <h2 className="text-foreground text-lg font-bold">FYNC</h2>
        <CreatorCard />
      </div>
    </footer>
  );
}
