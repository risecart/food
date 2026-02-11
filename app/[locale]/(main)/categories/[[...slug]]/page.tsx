import CategotySections from "@/components/category/Index";

interface Props {
  params: Promise<{ locale: Local; slug?: string[] }>;
  searchParams: Promise<{
    page?: string;
    limit?: string;
    min_price?: string;
    max_price?: string;
  }>;
}

export default async function CategoriesPage({ params, searchParams }: Props) {
  const { page, limit } = await searchParams;
  const { slug } = await params;
  const lastId = slug?.at(-1) || undefined;
  const filterProduct: FillterProduit = lastId
    ? {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
        categoryId: Number(lastId),
      }
    : {
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      };
  const filterCategory: FillterCategory = {
    page: 1,
    limit: 50,
  };
  return (
    <CategotySections
      filterCategory={filterCategory}
      filterProduct={filterProduct}
      searchParams={searchParams}
    />
  );
}
