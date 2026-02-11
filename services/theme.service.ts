import ApiConfig from "@/config/api.config";
import axiosInstance from "@/lib/axiosInstance";
import { useFetch } from "./useFetch";
import { fetchInstanceFromUrl } from "@/lib/fetchInstance";

const getTheme = async (): Promise<ThemeSetting> => {
  return (await axiosInstance.get(ApiConfig.urls.theme)).data;
};

export const getThemeServer = async () => {
  return fetchInstanceFromUrl<ThemeSetting>(ApiConfig.urls.theme, {
    method: "GET",
    params: {
      domain: ApiConfig.db,
    },
    revalidate: 10,
    key: "Theme",
  });
};

export const getMetaFromServer = async (params?: FillterCategory) => {
  const data = await fetchInstanceFromUrl<ThemeSetting>(ApiConfig.urls.theme, {
    method: "GET",
    params: {
      domain: ApiConfig.db,
    },
    revalidate: 3600,
    key: "Meta",
  });
  return {
    generalSetting: data.theme?.generalSetting,
    favicon: data.theme?.favicon,
  };
};

const useGetTheme = () => {
  return useFetch({
    queryFn: () => getTheme(),
    queryKey: ["theme"],
    enabled: false,
    staleTime: 2000,
  });
};

const themeService = {
  getTheme,
  getMetaFromServer,
  getThemeServer,
  useGetTheme,
};

export default themeService;
