import ProductOptions from "@/components/product/ProductOptions";
import ReviewsSection from "@/components/product/Reviews";
import SliderProduitSugustions from "@/components/product/SliderProduitSugustions";
import { Card } from "@/components/ui/card";
import initTranslations from "@/lib/i18n";
import { grtMetadataProduct } from "@/meta/product";
import productService from "@/services/produit.service";

interface Props {
  params: Promise<{ slug: string; locale: Local }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return await grtMetadataProduct(slug);
}

export default async function ProductPage({ params }: Props) {
  const { slug, locale } = await params;
  const data = await productService.getOneProductServer(slug);
  const { t } = await initTranslations(locale);
  const products = await productService.getProductServer({
    limit: 10,
    page: 1,
  });

  return (
    <div className="p-2 mt-5">
      <ProductOptions
        data={{
          ...data,
          qte: 1,
          checkData: {
            color: null,
            size: null,
          },
        }}
        isSingle={data.isLandingPage}
      />
      <div />
      <hr className="p-5" />
      {data.description && (
        <div className="col-span-2">
          <Card className="rounded-md shadow-none border-none  p-4">
            <h1 className="text-2xl font-semibold ">{t("desc")}</h1>
            <div className="w-full md:overflow-hidden overflow-x-auto break-words text-sm">
              <div
                className="min-w-0"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></div>
            </div>
          </Card>
        </div>
      )}
      {/**
       * here can make revies section
       */}
      {data.Reviews.length ? (
        <>
          <ReviewsSection reviews={data.Reviews} id={data.id} />{" "}
        </>
      ) : null}

      {/**
       * section of same category
       */}
      <SliderProduitSugustions className="mt-10" products={products.data} />
    </div>
  );
}
