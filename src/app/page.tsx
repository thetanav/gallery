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
    imagesArr = await db
      .select()
      .from(images)
      .orderBy(desc(images.createdAt));
  } else {
    imagesArr = await db
      .select()
      .from(images)
      .where(keyword ? ilike(images.name, `%${keyword}%`) : undefined);
  }

  return (
    <main>
      <div className="flex flex-wrap justify-center gap-4 p-3 py-4 md:px-16">
        <div className="mb-4 mt-4 flex w-full justify-center px-8 md:px-0">
          <SearchBox />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
        {imagesArr.map((image) => (
          <Link
            href={"/image/" + image.id}
            className="flex w-fit select-none flex-col items-center justify-center group"
            draggable="false"
            key={image.id}
          >
            <img
              src={image.url}
              width={260}
              height={260}
              alt="a user photo"
              className="block h-fit w-96 sm:max-h-52 md:max-h-72 sm:w-fit sm:max-w-52 md:max-w-72 border select-none rounded brightness-100 transition-all group-hover:brightness-95"
              draggable="false"
            />
            <div className="mt-1 flex w-96 sm:w-52 font-semibold">
              <p className="text-md mr-2 w-full truncate text-primary">
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
