import Link from "next/link";
import CreatorCard from "./_components/Creater";
import { DrawerDemo } from "./_components/Drawer";
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex flex-wrap justify-center gap-1 p-3 md:px-16 md:py-3">
      {Array.from({ length: 10 }).map((_, i) => (
        <Link href="/image/2" className="select-none" draggable="false" key={i}>
          <Image
            src="/thumb.jpeg"
            width={288}
            height={288}
            quality={40}
            alt="a user photo"
            className="mr-1 rounded hover:brightness-90 transition-transform select-none max-w-72" draggable="false"
          />
        </Link>
      ))}
    </main>
  );
}
