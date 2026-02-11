


"use client";
import PromoIcon from "../icons/PromoIcon";
import Currency from "../Currency";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import FavoriteHandler from "../product/FavoriteHandler";
import getImages from "@/lib/getImages";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import ProductOptions from "../product/ProductOptions";
import productService from "@/services/produit.service";
import { useEffect, useState } from "react";

import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerOverlay, DrawerTrigger } from "../ui/drawer";


interface ProductCardFoodProps {
  data: Product;
  showFull?: boolean;
  hidePrice?: boolean;
  isPrivate?: boolean;
  isModal?: boolean;
}

export default function ProductCardFood({ data, isModal = false }: ProductCardFoodProps) {
  const { t } = useTranslation();
  const promo = !!data.CompareAtPrice;

  return (

    <ProductPopup
      slug={data.slugName}
    >
      <LinkR
        // href={isModal ? undefined : "/product/" + data.slugName}

        className="group max-w-62.5 h-fit  w-full ">
        <div className="relative w-full shadow-sm  rounded-lg bg-white overflow-hidden bg-gradient-to-b from-white to-accent   flex flex-col">

          <div className="relative left-0 right-0 pt-[100%] ">
            <div className="absolute inset-0 ">
              <Image
                alt={getImages(data.images[0]).toString()}
                width={150}
                height={150}
                priority
                sizes="(max-width: 768px) 120px, 150px"
                className={
                  `object-cover object-center w-full h-full  border-0   shadow-sm  ${data.images.length >= 2 ? "group-hover:hidden" : ""
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
                    "object-cover object-center w-full h-full   border-0   hidden group-hover:block" +
                    (promo ? " border-rose-500" : " border-primary")
                  }
                  src={getImages(data.images[1])}
                />
              )}
            </div>
            <div className="absolute right-1 top-1 flex flex-col">
              <div className=" p-1 bg-black/40 text-white rounded-full">
                <FavoriteHandler isSmall product={data} />
              </div>
            </div>
          </div>

          {promo && (
            <PromoIcon className="w-8 h-8 fill-rose-500 absolute left-0 right-0 m-auto top-[85px] " />
          )}

          <div className="">
            <div className="h-[10px] "></div>

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
                {
                  // isModal ? <ProductPopup
                  //   slug={data.slugName}
                  // >
                  //   <Button className="grow w-full border-none mt-2 bg-white group-hover:bg-primary group-hover:font-semibold text-gray-700 group-hover:text-white">
                  //     {t("buy")}
                  //   </Button>
                  // </ProductPopup> :
                  <Button className="grow border-none mt-2 bg-white group-hover:bg-primary group-hover:font-semibold text-gray-700 group-hover:text-white">
                    {t("buy")}
                  </Button>
                }

              </div>
            </div>
          </div>
        </div>
      </LinkR>
    </ProductPopup>
  );
}

function LinkR({ href, className, children }: { href?: string, className: string, children: React.ReactNode }) {
  return href ? <Link
    href={href}
    className={className}>
    {children}
  </Link> :
    <div
      className="group max-w-62.5 h-fit   w-full">
      {children}
    </div>
}

function ProductPopup({ slug, children }: { slug: string, children: React.ReactNode }) {
  const [data, setData] = useState<Product>()

  const [open, setOpen] = useState(false)
  const [showAnimation, setShowAnimation] = useState(true)
  const getData = async () => {
    const d = await productService.getOneProductServer(slug);
    setData(d)
  }
  useEffect(() => {
    getData()
  }, [])





  return <>


    <Drawer
      autoFocus
      direction="bottom"
      fixed
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
      }}

    >
      <DrawerTrigger className=" group max-w-62.5 h-fit w-full">
        {children}
      </DrawerTrigger>
      <DrawerOverlay className="fixed inset-0 bg-black/5 backdrop-blur-md z-40" />
      <DrawerContent className="w-full!   bg-white " >
        <DrawerHeader className="p-0">

          <DrawerDescription />
        </DrawerHeader>
        <div className="p-4 pt-0 relative z-50 mt-3  overflow-auto "
          onScroll={(e) => {
            console.log(e.currentTarget.scrollTop)
          }}
          id="product-sc" >

          <div className="w-full relative">
            {data && <ProductOptions
              afterChange={() => {
                setOpen(false)
              }}
              hideForm={true}
              data={{
                ...data,
                qte: 1,
                checkData: {
                  color: null,
                  size: null,
                },
              }} />}
          </div>
          {showAnimation && <div className="absolute sm:hidden bottom-14 left-1/2 -translate-x-1/2 -rotate-90">
            <div className="arrow-sc ">
              <span></span>
              <span></span>
              <span></span>
            </div>

          </div>}
        </div>
      </DrawerContent>
    </Drawer>

  </>
}
