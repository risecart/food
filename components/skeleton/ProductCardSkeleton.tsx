"use client";
import { Skeleton } from "../ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="shadow-xs rounded-lg">
      <div className="w-full  relative pt-[100%] block">
        <Skeleton className="w-full h-full absolute top-0 left-0 right-0 bottom-0 " />
      </div>

      <div className="p-2 pb-0 flex flex-col relative">
        <Skeleton className="h-8 w-full " />
        <Skeleton className="h-4 w-16 !mt-2 m-auto " />
      </div>

      <div className="p-2 pt-2">
        <div className="w-full flex justify-center gap-2">
          <Skeleton className="grow h-8 " />
          <Skeleton className="w-10 h-8" />
        </div>
      </div>
    </div>
  );
}
