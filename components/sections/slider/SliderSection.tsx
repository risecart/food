"use client";

import SwiperGeneral from "@/components/SwiperGeneral";
import { Button } from "@/components/ui/button";
import detectMediaType from "@/lib/detectMediaType";
import getImages from "@/lib/getImages";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const breakPointsProduct = {
  0: { slidesPerView: 1, spaceBetween: 0 },
  8000: { slidesPerView: 1, spaceBetween: 0 },
};

export default function SliderSection({ data }: { data: HomePageSection }) {
  const { t } = useTranslation();

  if (!data?.sliders?.length) return null;

  const renderVideo = (src: string, isMobile = false) => {
    return detectMediaType(src) === "video" ? (
      <video
        playsInline
        autoPlay
        muted
        preload="auto"
        loop
        className={`absolute top-1/2 left-1/2 h-auto w-auto min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 opacity-40 ${
          isMobile ? "block sm:hidden" : "hidden sm:block"
        }`}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    ) : null;
  };

  return (
    <SwiperGeneral
      breakpoints={breakPointsProduct}
      items={data.sliders.map((el, k) => {
        const image = getImages(el.image).toString();
        const mobileImage = getImages(el.mobileImage, true).toString();
        const isVideo = el.mediaType === "video";

        return (
          <div
            key={k}
            className="relative w-full aspect-[16/9] sm:aspect-[16/7] max-w-[1280px] mx-auto rounded-2xl overflow-hidden border min-h-[500px]"
          >
            {/* ✅ Image or Video Background */}
            {isVideo ? (
              <div className="absolute inset-0 bg-black/90">
                {renderVideo(image)}
                {renderVideo(mobileImage, true)}
              </div>
            ) : (
              <>
                {/* ✅ Mobile image */}
                <div className="absolute inset-0 block sm:hidden">
                  <Image
                    src={mobileImage}
                    alt="Mobile"
                    className="object-cover object-center w-full h-full"
                    width={768}
                    height={400}
                    priority={k === 0}
                    sizes="100vw"
                  />
                </div>

                {/* ✅ Desktop image */}
                <div className="absolute inset-0 hidden sm:block">
                  <Image
                    src={image}
                    alt="Desktop"
                    className="object-cover object-center w-full h-full"
                    width={1280}
                    height={550}
                    priority={k === 0}
                    sizes="100vw"
                  />
                </div>
              </>
            )}

            {/* ✅ Overlay Content */}
            <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-center text-center">
              <h1
                style={{ color: el.headingColor }}
                className="text-4xl sm:text-5xl tracking-[4px] font-bold capitalize"
              >
                {el.headingText}
              </h1>
              <p
                style={{ color: el.subheadingColor }}
                className="my-3 text-base sm:text-lg font-medium tracking-[4px]"
              >
                {el.subheadingText}
              </p>
              {el.link && (
                <a href={el.link} target="_blank" rel="noopener noreferrer">
                  <Button className="min-w-[120px] text-sm sm:text-lg mt-2">
                    {t("visit")}
                  </Button>
                </a>
              )}
            </div>
          </div>
        );
      })}
    />
  );
}
