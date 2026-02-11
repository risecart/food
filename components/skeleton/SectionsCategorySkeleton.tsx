"use client";
import { Skeleton } from "../ui/skeleton";

export default function SectionsCategorySkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="flex flex-col items-center gap-3 p-5">
        <Skeleton className="w-[290px] h-[20px] shadow-xs rounded-lg " />
        <Skeleton className="w-[400px] h-[10px] shadow-xs rounded-lg " />
      </div>
      <div className="grid relative md:grid-cols-4 grid-cols-2  gap-5">
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />
          <Skeleton className="w-14 h-3 shadow-xs bg-gray-300 rounded-lg absolute bottom-1 m-2 " />
        </div>
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />
          <Skeleton className="w-14 h-3 shadow-xs bg-gray-300 rounded-lg absolute bottom-1 m-2 " />
        </div>
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />
          <Skeleton className="w-14 h-3 shadow-xs bg-gray-300 rounded-lg absolute bottom-1 m-2 " />
        </div>
        <div>
          <Skeleton className="w-[290px] h-[340px] shadow-xs rounded-lg " />
          <Skeleton className="w-14 h-3 shadow-xs bg-gray-300 rounded-lg absolute bottom-1 m-2 " />
        </div>
      </div>
    </div>
  );
}
