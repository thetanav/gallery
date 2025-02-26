import Link from "next/link";
import { db } from "~/server/db";
import { HeartIcon } from "lucide-react";
import { images } from "~/server/db/schema";
import { and, desc, eq, ilike } from "drizzle-orm";
import SearchBox from "../_components/SearchBox";
import { auth } from "~/server/auth";
import { notFound } from "next/navigation";

export default async function Page(props: { searchParams: any }) {
  const session = await auth();

  if (!session) return notFound();

  const searchParams = await props.searchParams;
  const keyword = searchParams.s || "";
  let imagesArr;
  if (keyword === "") {
    imagesArr = await db
      .select()
      .from(images)
      .where(eq(images.userId, session?.user.id ?? ""))
      .orderBy(desc(images.createdAt));
  } else {
    imagesArr = await db
      .select()
      .from(images)
      .where(
        and(
          ilike(images.name, `%${keyword}%`),
          eq(images.userId, session?.user.id ?? ""),
        ),
      );
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
                <div className="flex items-center justify-center gap-1">
                  <HeartIcon className="h-5 w-5 fill-rose-500 stroke-none text-rose-500" />
                  <span className="text-sm font-medium text-rose-500">
                    {image?.clap || 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
