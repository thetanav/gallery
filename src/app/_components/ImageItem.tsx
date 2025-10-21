import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ImageItem({ image }: { image: any }) {
  return (
    <Link
      href={"/bkt/" + image.id}
      className="group flex select-none flex-col items-center justify-center"
      draggable="false"
      key={image.id}
    >
      <div>
        <img
          src={image.url}
          alt={image.name}
          className="h-fit w-full rounded-md border sm:max-h-48 sm:max-w-56"
          draggable="false"
        />
      </div>
      <div className="mt-2 flex w-full items-center justify-center gap-3 px-4">
        <p className="max-w-36 truncate rounded-lg px-2 py-0 text-xs text-white group-hover:bg-accent">
          {image.name}
        </p>
        {image.like && (
          <HeartIcon className="h-4 w-4 fill-rose-600 text-rose-600 transition-opacity" />
        )}
      </div>
    </Link>
  );
}
