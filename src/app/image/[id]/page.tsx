import { and, eq } from "drizzle-orm";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Button } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();
  const imageId = parseInt(params.id, 10);
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => (imageId ? eq(model.id, imageId) : undefined),
  });
  const user = await db.query.users.findFirst({
    where: (model, { eq }) =>
      image?.userId ? eq(model.id, image.userId) : undefined,
  });

  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center px-3 py-8">
      <Image
        src={image?.url!}
        width={500}
        height={500}
        alt="a user photo"
        className="mt-4 w-fit select-none border sm:max-w-[80vw] sm:max-h-[60vh]"
        draggable="false"
      />
      <div className="mt-8 flex w-full justify-between sm:max-w-[80vw]">
        <div>
          <h3 className="text-md mb-2 w-full font-bold">{image?.name}</h3>
          <div className="flex items-center">
            <img
              src={user?.image!}
              className="mr-1 h-5 w-5 rounded-full"
              alt=""
            />
            <p className="text-md text-primary/70">{user?.name}</p>
          </div>
          <p className="text-sm text-primary/70">
            Uploaded: {image?.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-center justify-start gap-1">
          <form
            action={async () => {
              "use server";
              await db
                .update(images)
                .set({ clap: image?.clap! + 1 })
                .where(eq(images.id, image?.id!));
            }}
          >
            <Button variant={"destructive"} size={"sm"}>
              <HeartIcon />
              {image?.clap}
            </Button>
          </form>
          {session?.user.id == image?.userId && (
            <form
              action={async () => {
                "use server";
                await db
                  .delete(images)
                  .where(
                    and(
                      eq(images.id, image?.id!),
                      eq(images.userId, session?.user.id!),
                    ),
                  );
                redirect("/");
              }}
            >
              <Button variant={"secondary"} size={"sm"}>
                delete
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
