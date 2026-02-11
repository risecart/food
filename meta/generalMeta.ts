import getImages from "@/lib/getImages";
import themeService from "@/services/theme.service";

export async function grtMetadataGeneral() {
  const data = await themeService.getMetaFromServer();
  return {
    title: data?.generalSetting?.storeTitle ?? data?.generalSetting?.storeName,
    description:
      data?.generalSetting?.storeDescription ?? "Default store description",
    openGraph: {
      title:
        data?.generalSetting?.storeTitle ?? data?.generalSetting?.storeName,
      description:
        data?.generalSetting?.storeDescription ?? "Default store description",
      siteName: data?.generalSetting?.storeName,
    },
    twitter: {
      card: "summary_large_image",
      title:
        data?.generalSetting?.storeTitle ?? data?.generalSetting?.storeName,
      description:
        data?.generalSetting?.storeDescription ?? "Default store description",
    },
    other: {
      "facebook:url": data?.generalSetting?.facebookUrl ?? "",
      "twitter:url": data?.generalSetting?.twitterUrl ?? "",
      "instagram:url": data?.generalSetting?.Instagram_url ?? "",
      "tiktok:url": data?.generalSetting?.TiktokUrl ?? "",
    },
    icons: {
      icon: getImages(data?.favicon) || "/favicon.ico",
    },
  };
}
