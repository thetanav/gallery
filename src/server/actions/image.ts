"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { images } from "../db/schema";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function ToggleLike(like: boolean, id: number) {
  await db.update(images).set({ like: !like }).where(eq(images.id, id));
  revalidatePath("/bkt/" + id);
}

export async function TogglePublic(publicV: boolean, id: number) {
  await db.update(images).set({ public: !publicV }).where(eq(images.id, id!));
  revalidatePath("/bkt/" + id);
}

export async function DeleteImage(id: number, userId: string) {
  await db
    .delete(images)
    .where(and(eq(images.id, id), eq(images.userId, userId)));
  redirect("/");
}
