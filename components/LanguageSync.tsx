"use client";
import "@/lib/i18n";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const supportedLanguages = ["en", "ar", "fr"];

const LanguageSync = () => {
  const pathname = usePathname();
  const { i18n } = useTranslation();
  useEffect(() => {
    const pathLocale = pathname.split("/")[1];
    const cookieLocale = Cookies.get("NEXT_LOCALE") || "en";

    if (supportedLanguages.includes(pathLocale)) {
      if (i18n.language !== pathLocale) {
        i18n.changeLanguage(pathLocale);
      }

      if (cookieLocale !== pathLocale) {
        Cookies.set("NEXT_LOCALE", pathLocale, { expires: 365 });
      }
    }
  }, [pathname]);

  return null;
};

export default LanguageSync;
