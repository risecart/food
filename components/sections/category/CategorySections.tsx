import { ButtonLodingMoreSlide } from "@/components/button/ButtonLodingMoreSlide";
import CategoryCard from "@/components/category/CategoryCard";
import SwiperGeneral from "@/components/SwiperGeneral";
import categoryService from "@/services/category.service";
import { CSSProperties } from "styled-components";
const breakPointsProduct = {
  0: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  740: {
    slidesPerView: 2,
    spaceBetween: 0,
  },
  830: {
    slidesPerView: 3,
    spaceBetween: 0,
  },

  900: {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  1200: {
    slidesPerView: 4,
    spaceBetween: 0,
  },
  8000: {
    slidesPerView: 4,
    spaceBetween: 0,
  },
};

export default async function CategorySections({
  showLoadMore,
  Button,
  data,
}: {
  showLoadMore: boolean | null;
  Button: Button | null;
  data: HomePageSection;
}) {
  const StyleSections: CSSProperties | undefined = {
    paddingTop: data.paddingTop,
    paddingBottom: data.paddingBottom,
    backgroundColor: data.backgroundColor,
  };

  const category = await categoryService.getCategoryServer();
  
  return (
    <div style={StyleSections} >
      <h1
        style={{
          color: "" + data.titleColor + " !important",
        }}
        className="text-center font-bold text-2xl uppercase"
      >
        {data.title}
      </h1>
      <p
        style={{
          color: "" + data.subTitleColor + "",
        }}
        className="text-center uppercase p-2"
      >
        {data.subTitle}
      </p>

      {!!category?.data.length && (
        <SwiperGeneral
          swiperProps={{
            wrapperClass: " items-center md:pb-2 ",
          }}
          breakpoints={breakPointsProduct}
          items={[
            ...(category
              ? category.data.map((el, k) => {
                  return <CategoryCard data={el} key={k} />;
                })
              : []),
            showLoadMore ? (
              <ButtonLodingMoreSlide data={Button} />
            ) : (
              <ButtonLodingMoreSlide />
            ),
          ]}
        />
      )}
    </div>
  );
}
