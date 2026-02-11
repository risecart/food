import React from "react";
import Currency from "../Currency";
import Image from "next/image";
import getImages from "@/lib/getImages";
import { Badge } from "@/components/ui/badge";

interface SearchItemsProps {
  data: Product;
  onClickProduct: () => void;
}

const SearchItems: React.FC<SearchItemsProps> = ({ data, onClickProduct }) => {
  const promo = !!data.CompareAtPrice;
  const discount =
    promo && data.price
      ? Math.round(
          ((data.CompareAtPrice - data.price) / data.CompareAtPrice) * 100
        )
      : 0;
  return (
    <div
      onClick={onClickProduct}
      className="flex border-b-[1.8px] border-dashed pb-4 flex-row gap-2 cursor-pointer z-50 p-2 w-full justify-start items-center ">
      <div className="relative w-[100px] h-[100px] min-w-[100px]">
        <Image
          alt={data.name}
          src={getImages(data.images[0], true)}
          fill
          sizes="100px"
          className="rounded-full object-cover shadow-md"
        />
        {promo && data.CompareAtPrice && (
          <Badge
            dir="ltr"
            className="absolute rounded-full leading-1 h-7 w-7 top-0 left-0 bg-rose-500">
            {-discount} %
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-start justify-center gap-1 h-full">
        <h2 className="text-start font-medium line-clamp-2">{data.name}</h2>
        <div className="flex flex-row justify-start items-center font-semibold">
          {!!data.CompareAtPrice && (
            <>
              <span className="italic text-gray-400 max-sm:text-[12px] line-through font-medium">
                {data.CompareAtPrice.toFixed(2)} <Currency />
              </span>
              <span className="me-2"></span>
            </>
          )}
          <span className="text-primary">
            {data.price.toFixed(2)} <Currency />
          </span>
        </div>
        <Badge className="text-xs rounded-full " variant={"outline"}>
          {data.category.name} {data.discount}
        </Badge>
      </div>
    </div>
  );
};

export default SearchItems;
