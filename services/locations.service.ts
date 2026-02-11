import axiosInstance from "@/lib/axiosInstance";
import { useFetch } from "./useFetch";

const getWilaya = async (
  param?: Fillterwilaya
): Promise<ResponseAtt<Wilaya>> => {
  const response = await axiosInstance.get<ResponseAtt<Wilaya>>(
    "/tenant/city-delivery",
    {
      params: param,
    }
  );
  return response.data;
};

const getCommune = async (param?: FillterCommune): Promise<CommuneReponse> => {
  const response = await axiosInstance.get<CommuneReponse>(
    "/tenant/city-delivery/" + param?.id_wilaya,
    {
      params: param,
    }
  );
  return response.data;
};

const getCommunePrice = async (
  param?: FillterCommunePricing
): Promise<CommunePriceReponse> => {
  const response = await axiosInstance.get<CommunePriceReponse>(
    "/tenant/city-delivery/pricing/" +
      param?.id_commune +
      "?product=" +
      (param?.product ?? [].join(",")),
    {
      params: param
        ? {
            limit: param.limit,
            page: param.page,
          }
        : {},
    }
  );
  return response.data;
};

const useGetWilaya = (param?: Fillterwilaya) => {
  return useFetch({
    queryFn: () => getWilaya(param),
    queryKey: ["wilaya"],
    enabled: true,
    staleTime: 2000,
  });
};

const useGetCommune = (param?: FillterCommune) => {
  return useFetch({
    queryFn: () => getCommune(param),
    queryKey: ["commune"],
    enabled: false,
    staleTime: 2000,
  });
};

const useGetCommunePrice = (param?: FillterCommunePricing) => {
  return useFetch({
    queryFn: () => getCommunePrice(param),
    queryKey: ["commune_peice"],
    enabled: false,
    staleTime: 2000,
    retry: false,
  });
};

const locationsService = { useGetWilaya, useGetCommune, useGetCommunePrice };

export default locationsService;
