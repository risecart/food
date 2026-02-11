import axiosInstance from "@/lib/axiosInstance";
import { useFetch } from "./useFetch";
import { fetchInstance } from "@/lib/fetchInstance";

const getProduct = async (
  param?: FillterCategory
): Promise<ResponseAtt<Product>> => {
  const response = await axiosInstance.get<ResponseAtt<Product>>(
    "/tenant/product/all",
    {
      params: param,
    }
  );
  return response.data;
};

export const getProductServer = async (params?: FillterCategory) => {
  return fetchInstance<ResponseAtt<Product>>("/tenant/product/all", {
    method: "GET",
    params,
    revalidate: 60,
    key: "product_",
  });
};

export const getOneProductServer = async (slug?: string) => {
  return fetchInstance<Product>("/tenant/product/find-one-by-slug/" + slug, {
    method: "GET",
    revalidate: 60,
    key: "product_all_",
  });
};

const useGetProduct = (param?: FillterCategory) => {
  return useFetch<ResponseAtt<Product>>({
    queryFn: () => getProduct(param),
    queryKey: ["products", param],
    enabled: false,
    staleTime: 2000,
  });
};

const productService = {
  getProduct,
  useGetProduct,
  getOneProductServer,
  getProductServer,
};

export default productService;
