import { ButtonLodingMoreSlide } from "@/components/button/ButtonLodingMoreSlide";

import ProductCardFood from "@/components/category/ProductCardFood";
import SwiperGeneral from "@/components/SwiperGeneral";
import productService from "@/services/produit.service";
import { CSSProperties } from "styled-components";
const breakPointsProduct = {
  0: {
    slidesPerView: 2,
    spaceBetween: 5,
  },
  740: {
    slidesPerView: 2,
    spaceBetween: 5,
  },
  830: {
    slidesPerView: 3,
    spaceBetween: 10,
  },

  900: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  1200: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
  8000: {
    slidesPerView: 5,
    spaceBetween: 10,
  },
};

export default async function ProductsSctions({
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
  const product = await productService.getProductServer({
    limit: 10,
    page: 1,
    categoryId: data.category?.id,
  });

  return (
    <div style={StyleSections}>
      <h1
        style={{
          color: "" + data.titleColor + " !important",
        }}
        className="text-center font-bold text-2xl uppercase">
        {data.title}
      </h1>
      <p
        style={{
          color: "" + data.subTitleColor + "",
        }}
        className="text-center uppercase p-2">
        {data.subTitle}
      </p>

      {!!product?.data.length && (
        <SwiperGeneral
          swiperProps={{
            wrapperClass: "items-center pb-10",
          }}
          withPagination
          breakpoints={breakPointsProduct}
          items={[
            ...(product
              ? product.data.map((el, k) => {
                  return <div className="w-full">
                  <ProductCardFood data={el} key={k} />
                  </div>
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
