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
      <div className="flex flex-wrap justify-center gap-4 p-3 py-4 md:px-16">
        <div className="mb-4 mt-4 flex w-full justify-center px-8 md:px-0">
          <SearchBox />
        </div>
        <div className="flex flex-wrap justify-center gap-4">
          {imagesArr.map((image) => (
            <Link
              href={"/image/" + image.id}
              className="group flex w-fit select-none flex-col items-center justify-center"
              draggable="false"
              key={image.id}
            >
              <img
                src={image.url}
                width={260}
                height={260}
                alt="a user photo"
                className="block h-fit w-96 select-none rounded border brightness-100 transition-all group-hover:brightness-95 sm:max-h-52 sm:w-fit sm:max-w-52 md:max-h-72 md:max-w-72"
                draggable="false"
              />
              <div className="mt-1 flex w-96 font-semibold sm:w-52">
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
