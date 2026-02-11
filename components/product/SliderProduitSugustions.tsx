"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import ProductCardFood from "../category/ProductCardFood";

interface SliderProduitSugustionsProps {
  products: Product[];
  className?: string;
}
export default function SliderProduitSugustions({
  products,
  className,
}: SliderProduitSugustionsProps) {
  const { t } = useTranslation();
  return (
    <div className={cn("", className)}>
      <div className="flex flex-row p-2 mb-5 items-center justify-between">
        <h1 className="text-xl font-semibold capitalize">
          {t("related_prod")}
        </h1>
        <Link
          className="font-semibold group hover:text-primary  w-[120px] text-md flex flex-initial items-center gap-1 "
          href={"/categories/" + products[0].category.id}>
          <span>{t("showMore")}</span>
          <span className="group-hover:pl-2 group-hover:transition-all duration-300 " />
          <ArrowRight className="rtl:rotate-180" />
        </Link>
      </div>
      <Swiper
        className="!pb-14"
        breakpoints={{
          200: {
            slidesPerView: 2,
          },
          500: {
            slidesPerView: 2,
          },

          660: {
            slidesPerView: 3,
          },

          890: {
            slidesPerView: 4,
          },

          1110: {
            slidesPerView: 5,
          },
        }}
        slidesPerView={"auto"}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}>
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <ProductCardFood data={item} key={item.id} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
