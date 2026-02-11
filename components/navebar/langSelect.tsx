"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import img_dz from "../../assets/dz.svg";
import img_en from "../../assets/us.svg";
import img_fr from "../../assets/fr.svg";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "@/i18nConfig";
import { LucideLanguages } from "lucide-react";

interface LangSelectProps {
  className?: string;
}



const locales = [
  { code: "ar", label: "Arabic", flag: img_dz },
  { code: "en", label: "English", flag: img_en },
  { code: "fr", label: "French", flag: img_fr },
] as const;

export const LangSelect = ({ className }: LangSelectProps) => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language as Local;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (value: Local) => {
    const days = 30;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `NEXT_LOCALE=${value};expires=${expires};path=/`;

    let newPathname = currentPathname;

    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      newPathname = `/${value}${currentPathname}`;
    } else {
      newPathname = currentPathname.replace(`/${currentLocale}`, `/${value}`);
    }

    router.push(newPathname);
    router.refresh();
  };

  const currentLang =
    locales.find((l) => l.code === currentLocale) || locales[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger  aria-label="Lang Change" className="focus-visible:outline-0 h-9 w-9 rounded-full cursor-pointer hover:bg-accent block">
        <LucideLanguages className="w-5 m-auto h-5" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-1.5">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleChange(locale.code)}
          >
            <Image src={locale.flag} alt="" className="w-5 mr-2" sizes="20px" />
            {locale.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
