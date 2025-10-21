import Link from "next/link";
import { db } from "~/server/db";
import { HeartIcon } from "lucide-react";
import { images } from "~/server/db/schema";
import { and, desc, eq, ilike } from "drizzle-orm";
import SearchBox from "./_components/SearchBox";
import ImageItem from "./_components/ImageItem";
import { auth } from "~/server/auth";
import Navbar from "./_components/Navbar";
import { redirect } from "next/navigation";

export default async function HomePage(props: { searchParams: any }) {
  const searchParams = await props.searchParams;
  const session = await auth();

  if (!session) redirect("/getstarted");

  const keyword = searchParams.s || "";
  let imagesArr;
  if (keyword === "") {
    imagesArr = await db
      .select()
      .from(images)
      .where(eq(images.userId, session?.user.id!))
      .orderBy(desc(images.createdAt));
  } else {
    imagesArr = await db
      .select()
      .from(images)
      .where(
        and(
          ilike(images.name, `%${keyword}%`),
          eq(images.userId, session?.user.id!),
        ),
      )
      .orderBy(desc(images.createdAt));
  }

  return (
    <main>
      <Navbar />
      <div className="container mx-auto p-8">
        <div className="grid gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
          {imagesArr.map((image) => (
            <ImageItem key={image.id} image={image} />
          ))}
        </div>
      </div>
    </main>
  );
}
