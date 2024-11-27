import Link from "next/link";
import Image from "next/image";
import Uploader from "./_components/Uploader";
import { db } from "~/server/db";
import { HeartIcon } from "lucide-react";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, {desc}) => desc(model.id)
  });

  return (
    <main>
      <div className="p-5 flex flex-col items-center justify-center gap-1">
        <p className="text-xl font-bold mb-1">Upload your images</p>
        <Uploader />
      </div>
      <div className="flex flex-wrap justify-center gap-4 p-3 md:px-16 md:py-3">
      {images.map((image) => (
        <Link href={"/image/"+image.id} className="select-none w-fit flex flex-col items-center justify-center" draggable="false" key={image.id}>
          <Image
            src={image.url}
            width={260}
            height={260}
            quality={40}
            alt="a user photo"
            className="rounded brightness-100 hover:brightness-90 transition-transform select-none block" draggable="false"
          />
          <div className="w-[260px] flex font-semibold mt-1">
          <p className="text-md text-primary truncate w-full">{image.name}</p>
          <div className="text-pink-700 flex gap-1 items-center justify-center">
            <HeartIcon  className="w-5 h-5"/>
            {image.clap}
          </div>
          </div>     
        </Link>
      ))}
      </div>
    </main>
  );
}
