"use client";

import { useAppDispatch } from "@/store/hooks";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { openSearchDraw } from "@/store/slices/settingSlice";

export const IconSerch = () => {
  const dispatch= useAppDispatch()
  return (
    <Button
    aria-label="Search"
    onClick={()=>{
      dispatch(openSearchDraw(true))
    }}
      variant={"ghost"}
      className={"relative rounded-full cursor-pointer !w-9 !h-9  text-black "}
    >
      <Search className="!w-5 !h-5" />
    </Button>
  );
};
