import { Skeleton } from "@/components/ui/skeleton";

const Searchskeleton = () => {
  return (
    <>
      <div className="h-28 flex flex-row gap-2 cursor-pointer z-50   w-full justify-start items-start">
        <Skeleton className="h-28 rounded-lg w-28" />
        <div className="flex flex-col items-start gap-2 justify-center h-full">
          <Skeleton className="text-sm text-start  w-56 h-10 rounded-lg " />
          <Skeleton className="w-36 h-5  p-2 " />
        </div>
      </div>
    </>
  );
};

export default Searchskeleton;
