import axiosInstance from "@/lib/axiosInstance";

import { useMount } from "./useMount";
import axios from "axios";
import { toast } from "sonner";

const createOrder = async (data: any) => {
  const response = await axiosInstance.post<ResponseOrder>(
    "/tenant/order",
    data
  );
  return response.data;
};

const createOrderAbonded = async (data: any) => {
  const response = await axiosInstance.post<any>(
    "/tenant/order-abandoned",
    data
  );
  return response.data;
};

const applyPromo = async (data: any, promo: string) => {
  try {
    const response = await axiosInstance.post<ResponsePromo>(
      "/tenant/coupons/" + promo,
      data
    );
    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.message || "Unexpected error occurred";
      throw new Error(message); // this will be caught in React Query's `onError`
    }
    throw error;
  }
};

const useCreateOrder = () => {
  return useMount({
    mutationFn: (data: any) => createOrder(data),
  });
};

const useCreateAbonded = () => {
  return useMount({
    mutationFn: (data: any) => createOrderAbonded(data),
  });
};

const useApplyPromo = () => {
  return useMount({
    mutationFn: (data: { data: any; promo: string }) =>
      applyPromo(data.data, data.promo),
    onError: (error: any) => {
      // Customize error handling
      toast.error(error.message || "Échec de l'application du coupon.");
    },

    onSuccess: (data) => {
      toast.success("Coupon appliqué avec succès!");
    },
  });
};

const orderService = { useCreateOrder, useCreateAbonded, useApplyPromo };

export default orderService;
