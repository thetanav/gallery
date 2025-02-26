import { and, eq } from "drizzle-orm";
import { HeartIcon, TrashIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import BackButton from "~/app/_components/BackButton";

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
    <div>
      <BackButton />
      <div className="mx-auto flex max-w-screen-md flex-col px-3">
        <div className="overflow-hidden rounded-lg shadow-md">
          <img
            src={image?.url!}
            alt={image?.name!}
            className="w-full object-cover"
            draggable="false"
            style={{ aspectRatio: "auto" }}
          />
        </div>

        <div className="mt-6 flex items-start justify-between">
          <div className="flex items-center">
            <Avatar className="mr-3 h-10 w-10">
              <AvatarImage src={user?.image!} alt={user?.name!} />
              <AvatarFallback>
                {user?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{user?.name}</p>
              <p className="text-sm opacity-60">
                Uploaded: {image?.createdAt.toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <form
              action={async () => {
                "use server";
                await db
                  .update(images)
                  .set({ clap: image?.clap! + 1 })
                  .where(eq(images.id, image?.id!));
              }}
            >
              <Button variant={"ghost"} className="rounded-full">
                <HeartIcon className="h-5 w-5 fill-rose-500 stroke-none text-rose-500" />
                <span className="text-sm font-medium">{image?.clap || 0}</span>
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
                <Button variant={"ghost"} className="rounded-full">
                  <TrashIcon />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
