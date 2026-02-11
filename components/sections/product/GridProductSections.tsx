"use client";
import { ButtonLodingMore } from "@/components/button/ButtonLodingMore";
import ProductCard from "@/components/category/ProductCard";
import SectionsProductListSkeleton from "@/components/skeleton/SectionsProductListSkeleton";
import productService from "@/services/produit.service";
import { CSSProperties, useEffect, useState } from "react";

type ProductsTotal = {
  data: Product[];
  total: number;
};

export default function GridProductSections({
  data,
}: {
  data: HomePageSection;
}) {
  const StyleBtnLodingMore = data.Button;
  const limit = data.limit ?? 5;
  const [page, setPage] = useState(1);
  
  const StyleSections: CSSProperties | undefined = {
    paddingTop: data.paddingTop,
    paddingBottom: data.paddingBottom,
    backgroundColor: data.backgroundColor,
  };
  const [dt, setDt] = useState<ProductsTotal>({
    data: [],
    total: 0,
  });
  const { isLoading, refetch } = productService.useGetProduct({
    limit: limit,
    page: page,
  });

  useEffect(() => {
    refetch().then((data) => {
      if (data.data)
        setDt({
          data: [...dt.data, ...data.data.data],
          total: data.data?.totalCount,
        });
    });
  }, [page]);

  if (dt?.data.length == 0) {
    return <SectionsProductListSkeleton />;
  }

  return (
    dt?.data.length && (
      <div style={StyleSections} className="my-4">
        <h1
          style={{
            color: "" + data.titleColor + "",
          }}
          className="text-center font-bold text-2xl"
        >
          {data.title}
        </h1>
        <p
          style={{
            color: "" + data.subTitleColor + "",
          }}
          className="text-center"
        >
          {data.subTitle}
        </p>
        <div className="grid grid-cols-5 gap-4 mt-4 max-sm:grid-cols-2 max-sm:gap-1">
          {dt?.data.map((el, k) => {
            return <ProductCard data={el} key={k} />;
          })}
        </div>
        <ButtonLodingMore
          data={StyleBtnLodingMore}
          isLoading={isLoading}
          limit={limit}
          page={page}
          setPage={setPage}
          total={dt.total}
        />
      </div>
    )
  );
}
