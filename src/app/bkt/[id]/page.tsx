import { and, eq } from "drizzle-orm";
import { HeartIcon, TrashIcon } from "lucide-react";
import { notFound, redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import BackButton from "~/app/_components/BackButton";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();

  if (!session) return notFound();

  const imageId = parseInt(params.id, 10);
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => (imageId ? eq(model.id, imageId) : undefined),
  });

  if (!image) return notFound();
  if (image.userId !== session.user.id) return notFound();

  const user = await db.query.users.findFirst({
    where: (model, { eq }) =>
      image?.userId ? eq(model.id, image.userId) : undefined,
  });

  return (
    <div className="relative h-screen w-full">
      <BackButton />
      <div className="flex h-full w-full items-center justify-center overflow-auto">
        <img
          src={image?.url!}
          alt={image?.name!}
          className="h-screen w-fit"
          draggable="false"
          style={{ aspectRatio: "auto" }}
        />
      </div>
      <div className="absolute right-20 top-20 ml-6 flex h-fit flex-col items-start space-y-6 rounded-xl border bg-secondary/40 p-6 backdrop-blur-xl">
        <h1>{image?.name}</h1>
        <p>{image?.size} bytes</p>
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
                .set({ like: !image?.like })
                .where(eq(images.id, image?.id!));
              revalidatePath("/bkt/" + image?.id);
            }}
          >
            <Button variant={"ghost"} className="rounded-full">
              {image?.like ? (
                <HeartIcon className="h-5 w-5 fill-rose-500 stroke-none" />
              ) : (
                <HeartIcon className="h-5 w-5 text-white" />
              )}
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
  );
}
