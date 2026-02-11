
"use client";
import EmptyItems from "../search/EmptyItems";

import ProductCardFood from "./ProductCardFood";
export default function ProductListClient({ data }: { data: Product[] }) {
  if (!data.length) {
    return (
      <div className="h-full min-h-[600px] relative">
        <div className="m-auto w-fit h-fit absolute left-0 right-0 top-0 bottom-0">
          <EmptyItems iconClassName="text-9xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-2">
      {data.map((item) => (
        <ProductCardFood isModal={true} data={item} key={item.id} />
      ))}
    </div>
  );
}
