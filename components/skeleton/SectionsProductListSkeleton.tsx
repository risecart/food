"use client";
import { Skeleton } from "../ui/skeleton";

export default function SectionsProductListSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col items-center gap-3 p-5">
        <Skeleton className="w-[290px] h-[20px] shadow-xs rounded-lg " />
      </div>
      <div className="grid relative md:grid-cols-4 grid-cols-2  gap-5">
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />

        </div>
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />

        </div>
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />
        </div>
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />
        </div>
      </div>
    </div>
  );
}
