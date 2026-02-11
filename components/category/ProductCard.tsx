"use client";

import getImages from "@/lib/getImages";
import Image from "next/image";
import Link from "next/link";
import Currency from "../Currency";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";
import FavoriteHandler from "../product/FavoriteHandler";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";

interface ProductCardProps {
  data: Product;
  showFull?: boolean;
  hidePrice?: boolean;
  isPrivate?: boolean;
}
/*
export default function ProductCard({ data }: ProductCardProps) {
  const { t } = useTranslation();
  const promo = !!data.CompareAtPrice;
  const styled = useAppSelector((state) => state.theme.theme?.productCardStyle);

  return (
    <Link
      href={"/product/" + data.slugName}
      className="group max-w-[250px] h-fit ">
      <div className="relative w-full md:h-[300px] h-[250px] mt-20 flex flex-col">
        <div className="absolute right-1 top-10 flex flex-col">
          <div className=" p-1">
            <FavoriteHandler isSmall product={data} />
          </div>
        </div>
        <div className="absolute m-auto md:h-[150px] md:w-[150px] h-[120px] w-[120px]  bg-white rounded-full md:-top-[60px] -top-[30px] right-0 left-0  ">
          <Image
            alt={getImages(data.images[0]).toString()}
            width={150}
            height={150}
            priority
            sizes="(max-width: 768px) 120px, 150px"
            className={
              `object-cover object-center w-full h-full  border-2  p-1 shadow-sm rounded-full ${
                data.images.length >= 2 ? "group-hover:hidden" : ""
              }` + (promo ? " border-rose-500" : " border-primary")
            }
            src={getImages(data.images[0])}
          />

          {data.images.length >= 2 && (
            <Image
              alt={getImages(data.images[0]).toString()}
              width={150}
              height={150}
              sizes="(max-width: 768px) 120px, 150px"
              className={
                "object-cover object-center w-full h-full   border-2  p-1 rounded-full hidden group-hover:block" +
                (promo ? " border-rose-500" : " border-primary")
              }
              src={getImages(data.images[1])}
            />
          )}
        </div>
        {promo && (
          <PromoIcon className="w-8 h-8 fill-rose-500 absolute left-0 right-0 m-auto top-[85px] " />
        )}

        <div className="shadow-sm rounded-lg bg-white bg-gradient-to-b from-white to-accent ">
          <div className="h-[100px] "></div>

          <div className="grow flex flex-col  p-2">
            <div className="h-[90px] flex flex-col items-center justify-start">
              <h1 className="max-md:text-sm text-md capitalize tracking-wider text-center leading-5 font-semibold text-accent-foreground mt-3 min-h-[40px] line-clamp-2 ">
                {data.name}
              </h1>
              <div className="flex justify-center text-[16px] font-semibold mt-2 max-md:flex-row max-md:text-[14px] gap-1 max-md:items-center">
                {!!data.CompareAtPrice && (
                  <>
                    <span className="line-through text-gray-400">
                      {data.CompareAtPrice.toFixed(2)} <Currency />
                    </span>
                    <span className="me-2  max-md:hidden"></span>
                  </>
                )}
                <span className={"text-primary"}>
                  {data.price.toFixed(2)} <Currency />
                </span>
              </div>
            </div>
            <Badge
              variant={"outline"}
              className="px-4 group-hover:bg-white   font-semibold text-center mx-auto">
              {data.category.name}
            </Badge>
            <div className="w-full flex justify-center gap-2 mb-0 m-auto">
              <Button className="grow border-none mt-2 bg-white group-hover:bg-primary group-hover:font-semibold text-gray-700">
                {t("buy")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}*/

const defaultStyle: ProductCardStyle = {
  price: {
    color: "var(--primary)",
    fontSize: "16px",
    paddingBottom: "2px",
    fontWeight: "700",
  },
  oldPrice: {
    color: "#9ca3af",
    fontSize: "14px",
    paddingBottom: "2px",
    fontStyle: "italic",
    fontWeight: "400",
  },
  name: {
    fontSize: "16px",
    paddingBottom: "0px",
    marginBottom: "0px",
    fontWeight: "600",
  },
  button: {
    backgroundColor: "var(--primary)",
    fontSize: "14px",
    padding: "10px",
    borderRadius: "12px",
    fontWeight: "700",
    color: "#fff",
    marginTop: "10px",
  },
  image: {
    type: "normal",
    style: {
      backgroundColor: "#fff",
      padding: "0px",
      marginBottom: "0px",
      borderRadius: "12px",
      borderStyle: "solid",
    },
    isActive: true,
  },
  options: {},
  parent: {
    backgroundColor: "#FFF",
    borderWidth: "1px",
    borderColor: "#dfe0dc",
    borderStyle: "solid",
    borderRadius: "12px",
  },
  badge: {
    backgroundColor: "var(--primary)",
    color: "#FFF",
    paddingLeft: "5px",
    paddingRight: "5px",
    borderRadius: "20px",
  },
  activeOptions: false,
  activeBadge: true,
};

export default function ProductCard({
  data,
  isPrivate = false,
}: ProductCardProps) {
  const { t } = useTranslation();
  const styled = useAppSelector((state) => state.theme.theme?.productCardStyle);

  const style: ProductCardStyle = useMemo(() => {
    return styled ? styled : defaultStyle;
  }, [styled]);

  const promo = !!data.CompareAtPrice;
  const discount =
    promo && data.price
      ? Math.round(
          ((data.CompareAtPrice - data.price) / data.CompareAtPrice) * 100
        )
      : 0;

  return (
    <div style={{ ...style.parent }} className={"group cursor-pointer relative"+ (isPrivate?" !border-rose-200":" ")}>
      <Link href={`/product/${data.slugName}`}>
        <div className="relative aspect-[1/1] overflow-hidden group">
          <div className={"absolute md:-right-10 right-2 group-hover:right-2  group-hover:transition-all border top-1 bg-white rounded-full z-10 p-1"}>
            <FavoriteHandler isSmall product={data} />
          </div>
          <div
            style={style.image.style}
            className="absolute inset-0 group/img overflow-hidden"
          >
            <Image
              width={300}
              height={300}
              alt={getImages(data.images[0]).toString()}
              className="object-cover transition-transform m-auto duration-300 ease-in-out group-hover:scale-105"
              src={getImages(data.images[0])}
              priority
            />

            {style.image.type !== "normal" && data.images.length >= 2 && (
              <Image
                width={300}
                height={300}
                alt={getImages(data.images[1]).toString()}
                className="object-cover transition-transform m-auto duration-300 ease-in-out group-hover/img:block hidden"
                src={getImages(data.images[1])}
                loading="lazy"
              />
            )}
          </div>

          {style.activeOptions && <FavoriteHandler isSmall product={data} />}
        </div>

        <div className="p-2 flex flex-col">
          <h1
            style={{
              ...style.name,
              textAlign: style.name.textAlign ?? "center",
            }}
            className="h-[48px] line-clamp-2 capitalize"
          >
            {data.name}
          </h1>

          <div className="flex justify-center text-[13px] font-semibold mt-2 max-md:flex-col max-md:items-center">
            {data.CompareAtPrice ? (
              <>
                <span style={{ ...style.oldPrice }} className="line-through">
                  {data.CompareAtPrice.toFixed(2)} <Currency />
                </span>
                <span className="me-2 max-md:hidden" />
              </>
            ) : (
              <div className="h-5"></div>
            )}

            <span
              style={{ ...style.price }}
              className={isPrivate ? "!text-rose-500" : "text-primary"}
            >
              {data.price.toFixed(2)} <Currency />
            </span>
          </div>

          <Button
            style={{ ...style.button }}
            className={`${isPrivate && "text-white !bg-rose-500"}`}
          >
            {t("buy")}
          </Button>
        </div>

        {promo && style.activeBadge && discount > 0 ? (
          <div
            style={{
              ...style.badge,
              backgroundColor: style.badge.backgroundColor ?? "var(--primary)",
            }}
            dir="ltr"
            className={`absolute top-2 left-2 ${
              isPrivate ? "text-white !bg-rose-500" : "bg-primary"
            }`}
          >
            -{discount}%
          </div>
        ) : null}
      </Link>
    </div>
  );
}
