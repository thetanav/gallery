import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "~/server/auth";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const session = await auth();
      const user = session?.user;

      // If you throw, the user will not be able to upload
      if (!user) throw new UploadThingError("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);
      // Try to capture the file size from the uploadthing `file` object. Different
      // versions/transformations may expose this under different keys, so fall back
      // to 0 if not present to satisfy the NOT NULL DB constraint.
      const size =
        (file as any).size ??
        (file as any).bytes ??
        (file as any).fileSize ??
        0;

      try {
        await db.insert(images).values({
          name: file.name,
          userId: metadata.userId,
          url: file.url,
          size,
        });
      } catch (err) {
        console.error("Failed to insert image record into DB:", err);
        // Surface a meaningful error back through UploadThing so the client can
        // observe the failure via onUploadError/onClientUploadComplete callbacks.
        throw new UploadThingError(
          "Failed to save upload metadata to the database",
        );
      }
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
