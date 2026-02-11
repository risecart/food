
import categoryService from "@/services/category.service";
import CategoryItems from "./CategoryItems";


export default async function CategoriesList(filter: FillterCategory) {
  const data = await categoryService.getCategoryServer(filter);

  return (
    <div className="w-full my-6">
      <CategoryItems data={data.data} />
    </div>
  );
}
