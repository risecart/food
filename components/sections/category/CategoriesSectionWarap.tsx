
import { Suspense } from "react";
import CategorySections from "./CategorySections";
import SectionsCategorySkeleton from "@/components/skeleton/SectionsCategorySkeleton";


export default async function CategoriesSectionWarap({
  data,
}: {
  data: HomePageSection;
}) {
  return (
    <Suspense fallback={<SectionsCategorySkeleton/>}>
      <CategorySections
        showLoadMore={data.showLoadMore}
        Button={data.Button}
        data={data}
      />
    </Suspense>
  );
}
