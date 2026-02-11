"use client";
import React from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

interface SwiperGeneralProps {
  swiperProps?: React.RefAttributes<SwiperRef> &
    React.PropsWithChildren<SwiperProps>;
  breakpoints?: any;
  autoPlay?: boolean;
  withPagination?: boolean;
  items: Array<any>;
  className?: string;
}
export default function SwiperGeneral({
  className,
  withPagination,
  swiperProps,
  autoPlay,
  breakpoints,
  items,
}: SwiperGeneralProps) {
  const { i18n } = useTranslation();
  return (
    <div className={cn("", className)}>
      <Swiper
        {...swiperProps}
        style={{ width: "100%", height: "100%" }}
        key={i18n.language}
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        modules={[
          Navigation,
          ...(withPagination ? [Pagination] : []),
          ...(autoPlay ? [Autoplay] : []),
        ]}
       
        breakpoints={breakpoints}
        pagination={{
          clickable: true,
          renderBullet: function (index, className) {
            if (index) {
            }
            return '<span class="' + className + '"></span>';
          },
        }}
        spaceBetween={10}
      >
        {items.map((el: any, index: any) => {
          return <SwiperSlide  key={index}>{el}</SwiperSlide>;
        })}
      </Swiper>
    </div>
  );
}
