"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "~/components/ui/input";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("s", value);
    } else {
      params.delete("s");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check if the pressed key is an alphabet letter
      if (
        e.key.length === 1 &&
        /^[a-zA-Z]$/.test(e.key) &&
        !e.ctrlKey &&
        !e.metaKey &&
        !e.altKey &&
        document.activeElement !== inputRef.current
      ) {
        // Focus the input and let the key be typed naturally
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex w-full items-center justify-start">
      <Input
        ref={inputRef}
        type="text"
        className="w-[14rem] rounded-full border bg-accent px-4 py-3 outline-none transition-all duration-300 ease-in-out focus:w-[20rem] focus:border-primary"
        placeholder="Search from..."
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
