"use client";

import { MdOutlineFavoriteBorder } from "react-icons/md";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

export const CartFavorite = () => {
  const fav = useAppSelector((state) => state.cart.faverites);
  return (
    <Link
      aria-label="View Favorite"
      href={"/favorites"}
      className={"relative hover:bg-accent p-2 cursor-pointer rounded-full"}
    >
      {fav.length != 0 && (
        <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute -top-1 right-0">
          {fav.length}
        </Badge>
      )}
      <MdOutlineFavoriteBorder className="!w-5  !h-5" />
    </Link>
  );
};
