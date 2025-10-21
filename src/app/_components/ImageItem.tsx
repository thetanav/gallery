import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ImageItem({ image }: { image: any }) {
  return (
    <Link
      href={"/bkt/" + image.id}
      className="group flex max-w-64 select-none flex-col items-center justify-center"
      draggable="false"
      key={image.id}
    >
      <div className="relative">
        <img
          src={image.url}
          alt={image.name}
          className="contain h-36 max-w-48 rounded-md border object-cover"
          draggable="false"
        />
        <HeartIcon className="absolute right-2 top-2 h-5 w-5 text-white opacity-75 transition-opacity group-hover:opacity-100" />
      </div>
      <div className="mt-1 flex w-full items-center justify-center">
        <p className="truncate rounded-lg px-2 py-0 text-sm font-semibold text-white group-hover:bg-accent">
          {image.name}
        </p>
      </div>
    </Link>
  );
}
