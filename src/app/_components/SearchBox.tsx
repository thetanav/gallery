"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "~/components/ui/input";

export default function SearchBox() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("s", value);
    } else {
      params.delete("s");
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  });

  return (
    <div className="flex w-full items-center justify-center">
      <Input
        type="text"
        className="transistion w-full rounded-xl border px-4 py-3 ring-primary/50 transition-colors focus:ring-2"
        placeholder="Search from..."
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
    </div>
  );
}
