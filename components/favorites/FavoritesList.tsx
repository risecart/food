"use client";

import { useAppSelector } from "@/store/hooks";

import EmptyFavorites from "./EmptyFavorites";
import ProductCardFood from "../category/ProductCardFood";

function FavoritesList() {
  const fav = useAppSelector((state) => state.cart.faverites);
  return fav.length != 0 ? (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-2">
      {fav.map((x) => (
        <ProductCardFood key={x.id} data={x} />
      ))}
    </div>
  ) : (
    <>
      <div className="h-full min-h-[600px] relative">
        <div className="m-auto w-fit h-fit absolute left-0 right-0 top-0 bottom-0">
          <EmptyFavorites iconClassName="text-9xl" />
        </div>
      </div>
    </>
  );
}

export default FavoritesList;
