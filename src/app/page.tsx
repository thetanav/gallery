import CreatorCard from "./_components/Creater";
import { DrawerDemo } from "./_components/Drawer";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      hello world.
      <DrawerDemo />
      <CreatorCard />
    </main>
  );
}
