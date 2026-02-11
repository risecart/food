import axiosInstance from "@/lib/axiosInstance";
import { useMount } from "./useMount";
import { toast } from "sonner";
import alertErr from "@/lib/alertErr";

const tracking = async (phone: string): Promise<OrderFull[]> => {
  const response = await axiosInstance.post<OrderFull[]>(
    "/tenant/order/phone-tracking",
    {
      phone: phone,
    }
  );
  return response.data;
};

const exchange = async (dt: ExchangeInput): Promise<any> => {
  const response = await axiosInstance.post<any>("/tenant/order/exchange", dt);
  return response.data;
};

const useExchange = () => {
  return useMount({
    mutationFn: (dt: ExchangeInput) => exchange(dt),
    onError: (error: any) => {
      alertErr(error);
    },
  });
};

const useTracking = () => {
  return useMount({
    mutationFn: ({ phone }: { phone: string }) => tracking(phone),
    onError: (error: any) => {
      alertErr(error);
    },
  });
};

const trackingService = { useTracking, useExchange };

export default trackingService;
