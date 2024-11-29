"use client";

import { useState } from "react";
import Image from "next/image";

export default function ResImage({ src }: { src: string }) {
  const [isHighResLoaded, setHighResLoaded] = useState(false);

  return (
    <div className="relative w-fit h-fit overflow-auto border flex items-center justify-center">
      <Image
        src={src}
        alt={"a user photo"}
        width={300}
        height={300}
        quality={1}
        draggable="false"
        className={`absolute w-full h-full inset-0 select-none transition-opacity duration-500 ${
          isHighResLoaded ? "opacity-0 hidden" : "opacity-100"
        }`}
      />
      <Image
        src={src}
        alt={"a user photo"}
        width={500}
        height={500}
        quality={90}
        draggable="false"
        onLoadingComplete={() => setHighResLoaded(true)}
        className={`absolute w-full h-full inset-0 select-none transition-opacity duration-500 ${
          isHighResLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
