"use client";

import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export default function LikeButton({ image }: { image: any }) {
  const [clap, setClap] = useState(image.clap);

  return (
    <Button variant={"destructive"} onClick={() => setClap(clap + 1)}>
      <HeartIcon className="h-5 w-5 stroke-[3px]" />
      {clap}
    </Button>
  );
}
