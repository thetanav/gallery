import { notFound } from "next/navigation";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import ImageActions from "~/app/_components/ImageActions";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const session = await auth();

  const imageId = parseInt(params.id, 10);
  const image = await db.query.images.findFirst({
    where: (model, { eq }) => (imageId ? eq(model.id, imageId) : undefined),
  });
  if (!image) return notFound();

  if (!image?.public && !session) return notFound();

  const user = await db.query.users.findFirst({
    where: (model, { eq }) =>
      image?.userId ? eq(model.id, image.userId) : undefined,
  });

  return (
    <div className="relative h-screen w-full">
      <div className="flex w-full items-center justify-center overflow-auto p-4 sm:p-24">
        <img
          src={image?.url!}
          alt={image?.name!}
          className="max-h-screen w-fit"
          draggable="false"
          style={{ aspectRatio: "auto" }}
        />
      </div>
      <ImageActions image={image} session={session} user={user} />
    </div>
  );
}
