import { and, eq } from "drizzle-orm";
import { HeartIcon } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { redirect } from "next/navigation";
import Modal from "~/app/_components/Modal";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

export default async function Page({
  params: { id: imageId },
}: {
  params: { id: number };
}) {
  const session = await auth();
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, imageId),
  });
  const user = await db.query.users.findFirst({
    where: (model, { eq }) =>
      image?.userId ? eq(model.id, image.userId) : undefined,
  });

  return (
    <Modal>
      <Image
        src={image?.url!}
        width={500}
        height={500}
        alt="a user photo"
        className="mt-4 min-w-96 select-none rounded border"
        draggable="false"
      />
      <div className="mt-2 flex justify-between">
        <div>
          <h3 className="mb-2 max-w-96 truncate text-lg font-bold">
            {image?.name}
          </h3>
          <div className="flex items-center">
            <img
              src={user?.image!}
              className="mr-1 h-5 w-5 rounded-full"
              alt=""
            />
            <p className="text-sm text-primary/70">{user?.name}</p>
          </div>
          <p className="text-sm text-primary/70">
            Uploaded: {image?.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          <form action={async () => {
            "use server";
            await db
              .update(images)
              .set({ clap: image?.clap! + 1 })
              .where(eq(images.id, image?.id!));
          }}>
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
    </Modal>
  );
}
