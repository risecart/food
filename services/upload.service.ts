import { useMount } from "./useMount";

import axiosInstanceFormData from "@/lib/axiosInstanceFormData";
import alertErr from "@/lib/alertErr";

const uploadImages = async (images: File[]): Promise<string> => {
  const formData = new FormData();
  images.forEach((image, _) => {
    formData.append("file", image);
  });
  const response = await axiosInstanceFormData.post<string>(
    "/upload-image",
    formData
  );
  return response.data;
};

const useUploadImages = () => {
  return useMount({
    mutationFn: ({ images }: { images: File[] }) => uploadImages(images),
    onError: (error: any) => {
      alertErr(error);
    },
  });
};

const uploadService = { useUploadImages };

export default uploadService;
