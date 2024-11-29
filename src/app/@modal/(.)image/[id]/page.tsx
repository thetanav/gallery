import { and, eq } from "drizzle-orm";
import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import Modal from "~/app/_components/Modal";
import ResImage from "~/app/_components/ResImage";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const session = await auth();
  const params = await props.params;
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => eq(model.id, params.id),
  });
  if (!image) return null;
  const user = await db.query.users.findFirst({
    where: (model, { eq }) =>
      image?.userId ? eq(model.id, image.userId) : undefined,
  });

  return (
    <Modal>
      <div className="flex mt-4 select-none justify-center items-center">
        <ResImage src={image.url} />
      </div>
      <div className="mt-2 flex w-full justify-between">
        <div>
          <Link className="mb-2 truncate max-w-72 text-lg font-bold" href={'/image/' + image.id}>
            {image.name}
          </Link>
          <div className="mb-2 flex items-center">
            <img
              src={user?.image!}
              className="mr-1 h-5 w-5 rounded-full"
              alt="author image"
            />
            <p className="text-sm text-primary/70">{user?.name}</p>
          </div>
          <p className="text-sm text-primary/70">
            Uploaded: {image?.createdAt.toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col items-center justify-center gap-1">
          {session?.user ? (
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
                {image.clap}
              </Button>
            </form>
          ) : (
            <Button variant={"destructive"} disabled size={"sm"}>
              <HeartIcon />
              {image.clap}
            </Button>
          )}
          {session?.user.id == image.userId && (
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
