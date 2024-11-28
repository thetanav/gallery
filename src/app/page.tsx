import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { HeartIcon } from "lucide-react";
import { auth } from "~/server/auth";

export default async function HomePage() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  const session = await auth();

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-4 p-3 py-4 md:px-16">
        {images.map((image) => (
          <Link
            href={"/image/" + image.id}
            className="flex w-fit select-none flex-col items-center justify-center"
            draggable="false"
            key={image.id}
          >
            <Image
              src={image.url}
              width={260}
              height={260}
              quality={40}
              alt="a user photo"
              className="block select-none w-fit h-fit max-w-52 max-h-52 rounded brightness-100 transition-transform hover:brightness-90"
              draggable="false"
            />
            <div className="mt-1 flex w-52 font-semibold">
              <p className="text-md w-full truncate text-primary mr-2">
                {image.name}
              </p>
              <div className="flex items-center justify-center gap-1 text-pink-600">
                <HeartIcon className="h-5 w-5" />
                {image.clap}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
