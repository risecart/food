import productService from "@/services/produit.service";
import ProductListClient from "./ProductListClient";
import Paginate from "../Pagination";

interface ProductListWrapperProps {
  filter: FillterProduit;
  searchParams:Promise< {
    page?: string;
    limit?: string;
    min_price?: string;
    max_price?: string;
  }>;
}

export default async function ProductListWrapper({
  filter,
  searchParams,
}: ProductListWrapperProps) {
  const dataParam = await searchParams;
  const data = await productService.getProductServer(filter);
  const currentPage = parseInt(dataParam.page || "1", 10);
  return (
    <div>
      <div className="flex text-sm  flex-row items-center justify-between p-2">
        <div>
          Showed <span className="font-semibold"> {data.totalCount} </span>
        </div>

        <div></div>
      </div>
      <ProductListClient  data={data?.data || []} />
      <div className="pt-10">
        <Paginate
          currentPage={currentPage}
          totalPages={Math.ceil(data.totalCount / 10)}
        />
      </div>
    </div>
  );
}
