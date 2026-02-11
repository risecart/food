import ProductOptions from "@/components/product/ProductOptions";

import { Card } from "@/components/ui/card";

import { grtMetadataProduct } from "@/meta/product";
import productService from "@/services/produit.service";

interface Props {
  params: Promise<{ slug: string }>;
}
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return await grtMetadataProduct(slug);
}

export default async function ProductPagePuy({ params }: Props) {
  const { slug } = await params;
  const data = await productService.getOneProductServer(slug);

  return (
    <div className="p-2 mt-5">
      <style>
        {`
          #NavBar{
            display: none !important;
          }
                #Footer{
            display: none !important;
          }
        `}
      </style>
      <ProductOptions
        data={{
          ...data,
          qte: 1,
          checkData: {
            color: null,
            size: null,
          },
        }}
        isSingle
      />
      <div />
      {data.description && (
        <div className="col-span-2">
          <Card className="rounded-md shadow-none bg-accent border-0 p-4">
            <h1 className="text-sm font-semibold uppercase">Descertions :</h1>
            <div dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </Card>
        </div>
      )}
    </div>
  );
}
