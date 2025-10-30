import { HeartIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ImageItem({ image }: { image: any }) {
  return (
    <Link
      href={"/bkt/" + image.id}
      className="group relative block w-full overflow-hidden rounded-lg border bg-card transition-all duration-200 hover:shadow-lg hover:ring-2 hover:ring-primary/50"
      draggable="false"
      key={image.id}
    >
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={image.url}
          alt={image.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, (max-width: 1280px) 20vw, 16vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          draggable="false"
          priority={false}
          loading="lazy"
        />
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        {/* Like icon - always visible if liked */}
        {image.like && (
          <div className="absolute right-2 top-2">
            <HeartIcon className="h-4 w-4 fill-rose-500 text-rose-500 drop-shadow-lg" />
          </div>
        )}
      </div>

      {/* Image name on hover */}
      <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <p className="truncate text-xs font-medium text-white drop-shadow-lg">
          {image.name}
        </p>
      </div>
    </Link>
  );
}
