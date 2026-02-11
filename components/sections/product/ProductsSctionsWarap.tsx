
import { Suspense } from "react";
import ProductsSctions from "./ProductsSctions";


export default async function ProductsSctionsWarap({
  data,
}: {
  data: HomePageSection;
}) {
  return (
    <Suspense fallback={<></>}>
      <ProductsSctions
        showLoadMore={data.showLoadMore}
        Button={data.Button}
        data={data}
      />
    </Suspense>
  );
}
