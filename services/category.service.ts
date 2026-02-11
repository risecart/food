import axiosInstance from "@/lib/axiosInstance";
import { useFetch } from "./useFetch";
import { fetchInstance } from "@/lib/fetchInstance";

const getCategory = async (param?: FillterCategory): Promise<any> => {
  return (
    await axiosInstance.get("/tenant/category", {
      params: param,
    })
  ).data;
};

export const getCategoryServer = async (params?: FillterCategory) => {
  // await new Promise((re)=>setTimeout(re,5000))
  return fetchInstance<ResponseAtt<Category>>("/tenant/category", {
    method: "GET",
    params,
    revalidate: 60,
    key: "category_",
  });
};

const useGetCategory = (param?: FillterCategory) => {
  return useFetch({
    queryFn: () => getCategory(param),
    queryKey: ["category"],
    enabled: false,
    staleTime: 2000,
  });
};

const categoryService = {
  getCategory,
  getCategoryServer,
  useGetCategory,
};

export default categoryService;
