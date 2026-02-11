import axiosInstance from "@/lib/axiosInstance";
import { useFetch } from "./useFetch";

const get = async (param?: FillterReviews): Promise<ResponseAtt<ReviewFull>> => {
  return (
    await axiosInstance.get("/tenant/reviews", {
      params: param,
    })
  ).data;
};

const useReviews = (param?: FillterReviews) => {
  return useFetch({
    queryFn: () => get(param),
    queryKey: ["reviews", param],
    enabled: false,
    staleTime: 2000,
  });
};

const reviewsService = { useReviews };

export default reviewsService;
