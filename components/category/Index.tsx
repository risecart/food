import { Suspense } from "react";
import CategoryItemsSkeleton from "../skeleton/CategoryItemsSkeleton";
import CategoriesList from "./CategoriesList";
import ProductCardSkeleton from "../skeleton/ProductCardSkeleton";
import ProductListWrapper from "./ProductListWrapper";
import { Card } from "../ui/card";
import SerchSections from "./SerchSections";

interface CategotySectionsProps {
  filterCategory: FillterCategory;
  filterProduct: FillterProduit;
  searchParams:Promise< {
    page?: string;
    limit?: string;
    min_price?: string;
    max_price?: string;
  }>;
}

export default function CategotySections({
  filterCategory,
  filterProduct,
  searchParams
}: CategotySectionsProps) {
  return (
    <div className="flex flex-col md:p-2 p-1 mt-2">
      <Card className="p-2 bg-white bg-gradient-to-b from-accent to-white from-50% to-100% shadow-none border-none">
        <Suspense
          fallback={
            <div className="flex flex-initial my-6 gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <CategoryItemsSkeleton key={i} />
              ))}
            </div>
          }
        >
          <SerchSections />
          <CategoriesList {...filterCategory} />
        </Suspense>

      </Card>

      <div className="pt-10">
        <Suspense
          fallback={
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <ProductListWrapper searchParams={searchParams} filter={filterProduct}  />
        </Suspense>
      </div>
     
    </div>
  );
}
