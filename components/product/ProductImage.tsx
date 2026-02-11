"use client";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import Image from "next/image";
import { useState } from "react";
import getImages from "@/lib/getImages";
import { Thumbs, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ZoomableImage from "./ZoomableImage";

function ProductImage({ data }: { data: Product; detect?: string | null }) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="w-full max-w-[600px] h-full relative  ">
      <div className="absolute bg-primary rounded-full p-0  h-10 w-10 top-5 z-10 ltr:left-5 rtl:right-5 ">
        <span className="font-semibold text-sm m-auto w-fit  relative top-2 ltr:left-1 rtl:right-1 text-white">
          -20%
        </span>
      </div>
      {/* Main Image Slider */}
      <Swiper
        pagination={{
          type: "bullets",
          enabled: true,
        }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Pagination, Thumbs]}
      >
        {data.images.map((el, index) => (
          <SwiperSlide tabIndex={index} key={index}>
            <div
              key={index}
              className="max-w-[600px] border-1  rounded-lg md:h-[600px] h-[400px] w-full  relative "
            >
              <ZoomableImage
         
                src={getImages(el).toString()}
            
            
          
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Thumbnail Slider */}
      <Swiper
        breakpoints={{
          200: {
            slidesPerView: 1,
          },

          300: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 3,
          },
          500: {
            slidesPerView: 4,
          },

          660: {
            slidesPerView: 5,
          },

          700: {
            slidesPerView: 5,
          },
        }}
        onSwiper={setThumbsSwiper}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs]}
        className="!w-full mt-4"
        wrapperClass="w-full"
      >
        {data.images.map((el, index) => (
          <SwiperSlide className="w-auto" tabIndex={index} key={index}>
            <div className="relative w-full max-w-[120px] h-[120px]  cursor-pointer">
              <Image
                priority
                src={getImages(el)}
                alt={getImages(el).toString()}
                fill
                className={"object-cover  rounded-lg border-2"}
                sizes="(max-width: 768px) 100vw, 120px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductImage;
