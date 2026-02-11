import { Resource, createInstance, i18n } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "@/i18nConfig";
import Resources from "@/lang/Resources";
import { z } from "zod";
import { makeZodI18nMap } from "zod-i18n-map";

export default async function initTranslations(
  locale: Local,
  i18nInstance?: i18n,
  resources?: Resource
) {
  i18nInstance = i18nInstance || createInstance();
  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((language: Local, namespace: Namespace) => {
        return Resources[language]?.[namespace];
      })
    );
  }

  await i18nInstance.init({
    lng: locale,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    preload: resources ? [] : i18nConfig.locales,
    ns: ["translation", "zod", "custom"],
    resources,
  });

  await i18nInstance.changeLanguage(locale);
z.setErrorMap(makeZodI18nMap({ t: i18nInstance.t, ns:  ["zod", "custom"] }));

  return {
    i18n: i18nInstance,
    resources: {
      [locale]: i18nInstance.services.resourceStore.data[locale],
    },
    t: i18nInstance.t,
  };
}
// ✅ Optional: Export the configured Zod
