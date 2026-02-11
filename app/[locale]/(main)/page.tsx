import CategoriesSectionWarap from "@/components/sections/category/CategoriesSectionWarap";
import GridImagesSections from "@/components/sections/grid/GridImagesSections";
import GridProductSections from "@/components/sections/product/GridProductSections";
import ProductsSctionsWarap from "@/components/sections/product/ProductsSctionsWarap";
import SliderSection from "@/components/sections/slider/SliderSection";
import themeService from "@/services/theme.service";

export default async function HomePage() {
  try {
    const data = await themeService.getThemeServer();
    return (
      <div className="flex flex-col gap-2 mt-5">
        {data.theme?.HomePage.HomePageSections.map((section, index) => {
          switch (section.type) {
            case "slider":
              return <SliderSection key={index} data={section} />;

            case "Categories":
              return <CategoriesSectionWarap key={index} data={section} />;

            case "ProductsList":
              return <ProductsSctionsWarap key={index} data={section} />;

            case "Products":
              return <GridProductSections key={index} data={section} />;

            case "GridImages":
              return <GridImagesSections key={index} data={section} />;
          }
        })}
      </div>
    );
  } catch (err) {
    return "error"
  }
}
