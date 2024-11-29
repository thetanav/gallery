"use client";

import { Suspense, useState } from "react";
import Image from "next/image";

export default function ResImage({ src }: { src: string }) {
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden w-full h-[70vh] md:w-96 md:h-96 rounded">
      <Image
        src={src}
        alt="A user photo"
        layout="fill"
        objectFit="contain"
        draggable="false"
        loading="eager"
        className={`transition-opacity duration-200 ${
          isHighResLoaded ? "opacity-0 hidden" : "opacity-100 blur-sm"
        }`}
      />
      <Image
        src={src}
        alt="A user photo"
        layout="fill"
        objectFit="contain"
        draggable="false"
        loading="lazy"
        onLoadingComplete={() => setHighResLoaded(true)}
        className={`transition-opacity duration-200 ${
          isHighResLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
