"use client";

import {
  GlobeIcon,
  HeartIcon,
  InfoIcon,
  LockKeyholeIcon,
  TrashIcon,
} from "lucide-react";
import { useState } from "react";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ToggleLike, DeleteImage, TogglePublic } from "~/server/actions/image";

export default function ImageAction({
  image,
  session,
  user,
}: {
  image: any;
  session: Session | null;
  user: any;
}) {
  if (!session || image.userId !== session.user.id) return null;

  return (
    <div className="fixed bottom-4 left-1/2 z-40 flex -translate-x-1/2 space-x-2 rounded-full bg-secondary/90 p-2 backdrop-blur">
      <form action={async () => await ToggleLike(image.like, image.id)}>
        <Button variant={"outline"} size="sm" className="rounded-full">
          {image?.like ? (
            <HeartIcon className="h-5 w-5 fill-rose-500 stroke-none" />
          ) : (
            <HeartIcon className="h-5 w-5 text-white" />
          )}
        </Button>
      </form>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} size="sm" className="rounded-full">
            <InfoIcon className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <h2 className="font-semibold">{image?.name}</h2>
            <p className="text-sm text-muted-foreground">
              Size: {Math.trunc(image?.size / 1024) / 100} MB
            </p>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user?.image!} alt={user?.name!} />
                <AvatarFallback>
                  {user?.name?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user?.name}</p>
                <p className="text-sm text-muted-foreground">
                  Uploaded: {image?.createdAt.toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-sm">
              {image?.public
                ? "Public - Anyone can view"
                : "Private - Only you can view"}
            </p>
          </div>
        </DialogContent>
      </Dialog>
      <form action={async () => await DeleteImage(image.id, session!.user.id)}>
        <Button variant={"outline"} size="sm" className="rounded-full">
          <TrashIcon className="h-5 w-5" />
        </Button>
      </form>
      <form action={async () => await TogglePublic(image.public, image.id)}>
        <Button
          variant={image?.public ? "outline" : "destructive"}
          size="sm"
          className="rounded-full"
        >
          {image?.public ? (
            <GlobeIcon className="h-5 w-5 text-white" />
          ) : (
            <LockKeyholeIcon className="h-5 w-5 text-white" />
          )}
        </Button>
      </form>
    </div>
  );
}
