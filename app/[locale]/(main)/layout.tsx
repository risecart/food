import FacbookPixle from "@/components/FacbookPixle";
import Footer from "@/components/footer/footer";
import MainContent from "@/components/MainContent";
import { NavBar } from "@/components/navebar";
import OrderSummary from "@/components/OrderSummary";
import PriceInit from "@/components/PriceInit";
import ProductSearchDrawer from "@/components/search/ProductSearchDrawer";
import ThemeInit from "@/components/ThemeInit";

import initTranslations from "@/lib/i18n";
import { grtMetadataGeneral } from "@/meta/generalMeta";
import TranslationsProvider from "@/providers/TranslationsProvider";
import themeService from "@/services/theme.service";
import { ReactNode } from "react";
import { Toaster } from "sonner";


export async function generateMetadata() {
  return grtMetadataGeneral()
}

export default async function PrivateLayout(props: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const { resources } = await initTranslations(locale as Local);
  const data = await themeService.getThemeServer();

  return (
    <>
      <TranslationsProvider resources={resources} locale={locale as Local}>
        <ThemeInit data={data}>
          <FacbookPixle />
          <PriceInit/>
          <NavBar />
          <ProductSearchDrawer />
          <MainContent className="!z-40 min-h-[90vh]" isBoxsed>
            {props.children}
          </MainContent>
          <OrderSummary />
          <Footer />
          <Toaster richColors position="top-center" />
        </ThemeInit>
      </TranslationsProvider>
    </>
  );
}
