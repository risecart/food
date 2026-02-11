import { Providers } from "./providers";
import "../../app/globals.css";
import { Cairo } from "next/font/google";
import { dir } from "i18next";
import localFont from "next/font/local";
import { ReactNode } from "react";
import i18nConfig from "@/i18nConfig";
import { notFound } from "next/navigation";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// font list
const gilroy = localFont({
  src: [
    {
      path: "../../public/fonts/Gilroy-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../public/fonts/Gilroy-UltraLight.woff2",
      weight: "200",
    },

    {
      path: "../../public/fonts/Gilroy-Light.woff2",
      weight: "300",
    },

    {
      path: "../../public/fonts/Gilroy-Regular.woff2",
      weight: "400",
    },

    {
      path: "../../public/fonts/Gilroy-Medium.woff2",
      weight: "500",
    },

    {
      path: "../../public/fonts/Gilroy-Semibold.woff2",
      weight: "600",
    },

    {
      path: "../../public/fonts/Gilroy-Bold.woff2",
      weight: "700",
    },

    {
      path: "../../public/fonts/Gilroy-Extrabold.woff2",
      weight: "800",
    },
    {
      path: "../../public/fonts/Gilroy-Black.woff2",
      weight: "800",
    },
  ],
  variable: "--font-gilroy",
  display: "swap", // or "optional" if warning
  preload: false,
});
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
  preload: false,
});

export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const { children } = props;

  if (!i18nConfig.locales.includes(locale)) {
    notFound();
  }

  // inject font to body
  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${gilroy.variable} ${cairo.variable} ltr:font-gilroy rtl:font-cairo`}
      suppressHydrationWarning
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
