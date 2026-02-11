import axiosInstance from "@/lib/axiosInstance";
import { useMount } from "./useMount";

const existing = async (data: ExistingOfferPropsRequest): Promise<ExistingOfferProps[]> => {
  return (
    await axiosInstance.post<ExistingOfferProps[]>("/tenant/offer/existing",data)
  ).data;
};

const useExisting = () => {
  return useMount({
    mutationFn: (data: ExistingOfferPropsRequest) => existing(data),
  });
};

const offerService = { useExisting };

export default offerService;
