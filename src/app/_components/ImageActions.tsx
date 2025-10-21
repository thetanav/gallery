"use client";

import {
  GlobeIcon,
  HeartIcon,
  LockKeyholeIcon,
  TrashIcon,
  X,
  ChevronLeft,
} from "lucide-react";
import { useState } from "react";
import { Session } from "next-auth";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
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
  const [open, setOpen] = useState(true);
  return (
    <>
      {/* Open button when closed (small screens) - anchored to right edge */}
      {!open && (
        <button
          aria-label="Open image actions"
          onClick={() => setOpen(true)}
          className="fixed right-2 top-1/2 z-50 -translate-y-1/2 rounded-l-md bg-secondary/90 p-2 backdrop-blur"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {/* Panel: fixed on small screens and slides horizontally; desktop keeps original absolute position */}
      <div
        className={`fixed right-10 top-10 z-40 ml-0 flex h-fit max-w-96 transform flex-col items-start space-y-3 rounded-xl border bg-secondary/90 p-6 backdrop-blur-xl transition-transform duration-300 ${
          open ? "right-0 translate-x-0" : "right-0 translate-x-full"
        }`}
      >
        {/* Close button for small screens inside the panel */}
        <button
          aria-label="Close image actions"
          onClick={() => setOpen(false)}
          className="ml-auto"
        >
          <X className="h-5 w-5" />
        </button>
        <h1 className="line-clamp-2">{image?.name}</h1>
        <p>{Math.trunc(image?.size / 10280) / 100} MB</p>
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

        {image.userId === session?.user.id && (
          <div className="flex items-center space-x-2">
            <form action={async () => await ToggleLike(image.like, image.id)}>
              <Button variant={"outline"} className="rounded-full">
                {image?.like ? (
                  <HeartIcon className="h-5 w-5 fill-rose-500 stroke-none" />
                ) : (
                  <HeartIcon className="h-5 w-5 text-white" />
                )}
              </Button>
            </form>
            <form
              action={async () => await DeleteImage(image.id, session!.user.id)}
            >
              <Button variant={"outline"} className="rounded-full">
                <TrashIcon />
              </Button>
            </form>
            <form
              action={async () => await TogglePublic(image.public, image.id)}
            >
              {image?.public ? (
                <Button variant={"outline"} className="rounded-full">
                  <GlobeIcon className="h-5 w-5 text-white" />
                  <p>Anyone can see this</p>
                </Button>
              ) : (
                <Button variant={"destructive"} className="rounded-full">
                  <LockKeyholeIcon className="h-5 w-5 text-white" />
                  <p>Only you can see this</p>
                </Button>
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
