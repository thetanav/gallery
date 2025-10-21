ALTER TABLE "gallery_image" ADD COLUMN "size" integer;--> statement-breakpoint
UPDATE "gallery_image" SET "size" = 0 WHERE "size" IS NULL;--> statement-breakpoint
ALTER TABLE "gallery_image" ALTER COLUMN "size" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "gallery_image" ADD COLUMN "like" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "gallery_image" DROP COLUMN "likes";