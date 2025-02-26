import Link from "next/link";
import { db } from "~/server/db";
import { HeartIcon } from "lucide-react";
import { images } from "~/server/db/schema";
import { desc, ilike } from "drizzle-orm";
import SearchBox from "./_components/SearchBox";

export default async function HomePage(props: { searchParams: any }) {
  const searchParams = await props.searchParams;
  const keyword = searchParams.s || "";
  let imagesArr;
  if (keyword === "") {
    imagesArr = await db.select().from(images).orderBy(desc(images.createdAt));
  } else {
    imagesArr = await db
      .select()
      .from(images)
      .where(keyword ? ilike(images.name, `%${keyword}%`) : undefined);
  }

  return (
    <main>
      <div className="container mx-auto p-3">
        <div className="mb-3 flex w-full justify-between">
          <SearchBox />
        </div>
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {imagesArr.map((image) => (
            <Link
              href={"/image/" + image.id}
              className="group relative mb-4 flex w-full select-none break-inside-avoid items-center justify-center overflow-hidden rounded-xl shadow-md"
              draggable="false"
              key={image.id}
            >
              <img
                src={image.url}
                alt={image.name}
                className="aspect-auto w-full"
                draggable="false"
              />
              <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-white/70 bg-opacity-80 px-4 py-2 backdrop-blur-lg">
                <p className="text-md truncate font-semibold text-black">
                  {image.name}
                </p>
                <div className="flex items-center justify-center gap-1 text-rose-600">
                  <HeartIcon className="h-5 w-5 stroke-[3px]" />
                  {image.clap}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
