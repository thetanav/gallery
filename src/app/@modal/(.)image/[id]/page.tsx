import Image from "next/image";
import Modal from "~/app/_components/Modal";
import { Button } from "~/components/ui/button";
import { auth } from "~/server/auth";
import { db } from "~/server/db";

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
          <h3 className="text-lg font-bold truncate max-w-96">{image?.name}</h3>
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
        <div>
          {session?.user.id == image?.userId && (
            <Button variant={"destructive"} size={"sm"}>
              delete
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
