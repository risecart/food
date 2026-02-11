"use client";

import getImages from "@/lib/getImages";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  const logo = useAppSelector((state) => state.theme.theme?.Logo);
  const logoMobil = useAppSelector((state) => state.theme.theme?.favicon);
  const defaultLogo = "/default-logo.png";
  const logoSrc = getImages(logo) || defaultLogo;
  const logoMobilSrc = getImages(logoMobil) || defaultLogo;
  return (
    <Link
      href="/"
      className="inline-block relative md:w-[120px] md:h-[40px] w-[40px] h-[40px] "
    >
      <Image
        alt="logo"
        src={logoSrc}
        fill
        className="object-contain pr-2 md:block hidden"
        sizes="(max-width: 768px) 100px, 120px"
        priority
      />
      <Image
        alt="logo"
        src={logoMobilSrc}
        fill
        className="object-contain pr-2 md:hidden block"
        sizes="(max-width: 768px) 100px, 120px"
        priority
      />
    </Link>
  );
};
