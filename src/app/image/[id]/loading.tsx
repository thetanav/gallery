import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-screen-lg flex-col items-center px-3 py-8">
      <Skeleton className="mt-4 w-full border sm:max-w-[80vw] h-56" />

      <div className="mt-8 flex w-full justify-between sm:max-w-[80vw]">
        <div>
          <h3 className="text-md mb-2 w-full font-bold">loading</h3>
          <div className="flex items-center">
            <Skeleton className="mr-1 h-5 w-5 rounded-full" />
            <p className="text-md text-primary/70">loading</p>
          </div>
          <p className="text-sm text-primary/70">Uploaded: sdfasdf</p>
        </div>
        <div className="flex flex-col items-center justify-start gap-1">
          <Skeleton className="h-16 w-32 rounded-md" />
        </div>
      </div>
    </div>
  );
}
