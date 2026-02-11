"use client";
import { Skeleton } from "../ui/skeleton";

export default function CategoryItemsSkeleton() {
  return (
    <div className="flex relative">
      <Skeleton className="w-[90px] h-[90px] shadow-xs rounded-lg " />
      <Skeleton className="w-14 h-3 shadow-xs bg-gray-300 rounded-lg absolute bottom-1 m-2 " />
    </div>
  );
}
