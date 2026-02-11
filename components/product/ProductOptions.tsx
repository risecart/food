"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "../ui/card";
import Attribute from "./Attribute";
import { Badge } from "../ui/badge";
import Currency from "../Currency";
import ProductImage from "./ProductImage";
import { useTranslation } from "react-i18next";
import Qte from "../Qte";
import { Button } from "../ui/button";
import { FiShoppingCart } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import AddonsView from "./AddonsView";
import {
  addToCart as addToCartContext,
  openCart,
} from "@/store/slices/cartSlice";
import SharProduct from "./SharProduct";

import FavoriteHandler from "./FavoriteHandler";
import eventsService from "@/services/events.service";
import SingleProductForm from "../checkout/SingleProductForm";
import { slowScrollToId } from "@/lib/slowScrollTo";
import Image from "next/image";
import getImages from "@/lib/getImages";

interface ProductOptionsProps {
  data: ProductCart;
  isSingle?: boolean;
  hideForm?: boolean,
  type?: "1" | "2";
  afterChange?: Function
}

const ProductOptions = ({ data, isSingle, type, hideForm = false, afterChange = () => { } }: ProductOptionsProps) => {
  const [product, setProduct] = useState<ProductCart>(data);
  const dispatch = useAppDispatch();
  const [productCheckout, setproductCheckout] = useState<ProductCart[]>([]);
  const [disaible, setdisaible] = useState<boolean>(false);
  const { t } = useTranslation();
  const setting = useAppSelector((state) => state.theme);

  const initSizes =
    product.attribute &&
      product.attribute.options &&
      product.attribute.options.length
      ? product.attribute.options[0].sizes.length
        ? true
        : false
      : false;

  const [openAddon, setOpenAddon] = useState(false);
  const isOnePage =
    useAppSelector(
      (state) => state.theme.theme?.CheckoutSettings.OnePageCheckout
    ) || isSingle;


  const addToCart = () => {

    if (!isValid()) {
      toast.warning(t("please_select_att") + " " + product.attribute.name);
      return;
    } else {
      dispatch(addToCartContext(product));
      setProduct({
        ...data,
        qte: 1,
        checkData: {
          color: null,
          size: null,
          addon: [],
        },
      });
      afterChange()
      toast.success(t("add_to_card_alert"),{
        duration:1500
      });
      dispatch(openCart(true));
    }

  };

  const isValid = useCallback(() => {
    if (
      product.attribute &&
      product.attribute.options &&
      product.attribute.options.length == 0
    )
      return true;
    if (product.checkData.color) {
      if (product.checkData.color.sizes.length != 0)
        return product.checkData.size != null;
      else return true;
    }
    return false;
  }, [product.checkData]);

  // auto change varait
  useEffect(() => {
    if (isValid() && product.addons.length == 0) {
      if (productCheckout.length == 0) {
        setproductCheckout((prev) => (prev ? [...prev, product] : [product]));
      } else {
        setproductCheckout((prev) => {
          if (!prev || prev.length === 0) {
            return [product];
          }
          return [...prev.slice(0, -1), product];
        });
      }
    }
  }, [product.checkData, product.qte]);

  // auto vide card if remove items
  useEffect(() => {
    if (productCheckout.length == 0) {
      setProduct({
        ...data,
        qte: 1,
        checkData: {
          color: null,
          size: null,
          addon: [],
        },
      });
    }
  }, [productCheckout.length]);

  useEffect(() => {
    eventsService.viewContentEvent(data, setting.pixelId ? "facebook" : "");
    eventsService.viewContentEvent(data, setting.tikTokId ? "tiktok" : "");
  }, []);




  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setVisible(entry.isIntersecting); // true إذا ظهر، false إذا اختفى
        });
      },
      {
        threshold: 0.1, // عندما يكون 10% من العنصر ظاهر
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, []);
  return (
    <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
      
      <div className="relative z-0" ref={ref}>
        <ProductImage data={data} />
      </div>
      <div className="md:grow w-full">
        <div className="my-5 max-sm:mt-0">
          <h1 className="font-semibold text-3xl max-w-lg capitalize max-sm:sticky z-20 top-0 bg-white max-sm:p-3  max-sm:text-2xl">
            {product.name}
          </h1>
          <div className="flex flex-col gap-2 my-2">
            <Badge className="" variant={"outline"}>
              {product.category.name}
            </Badge>
            <div className="flex justify-start text-lg font-semibold items-center flex-row max-md:items-center">
              {!!product.CompareAtPrice && (
                <>
                  <span className="line-through text-sm text-gray-400">
                    {product.CompareAtPrice.toFixed(2)} <Currency />
                  </span>
                  <span className="me-2 max-md:hidden"></span>
                </>
              )}
              <span className={"text-primary"}>
                {product.price.toFixed(2)} <Currency />
              </span>
            </div>
          </div>
          {!disaible && (
            <Card className="flex-col mt-5 relative flex gap-2 border-primary p-4 border-1 shadow-none  rounded-md ">
              {product.attribute &&
                product.attribute.options &&
                product.attribute.options.length ? (
                <div id="scroll_here_att" className="mt-3">
                  <h2 className="font-medium italic">
                    {product.attribute.name}
                  </h2>
                  <Attribute
                    onClick={(el: Color) => {
                      setProduct({
                        ...product,
                        checkData: {
                          size: null,
                          color: el,
                        },
                        price:
                          product.hasOffer &&
                            product.minNumberQteOffer &&
                            product.priceOffer &&
                            product.qte >= product.minNumberQteOffer
                            ? product.priceOffer
                            : el.price
                              ? el.price
                              : data.price,
                        oldPrice: data.price,
                      });
                    }}
                    ActiveId={product.checkData.color?.id}
                    data={product.attribute.options}
                  />
                </div>
              ) : (
                ""
              )}
              {initSizes ? (
                <div className="mt-2">
                  <h2 className="font-medium italic">
                    {product.attribute.optionsName}
                  </h2>
                  <Attribute
                    onClick={(el: Size) => {
                      setProduct({
                        ...product,
                        checkData: {
                          ...product.checkData,
                          size: el,
                        },
                        price:
                          product.hasOffer &&
                            product.minNumberQteOffer &&
                            product.priceOffer &&
                            product.qte >= product.minNumberQteOffer
                            ? product.priceOffer
                            : el.price
                              ? el.price
                              : data.price,
                        oldPrice: data.price,
                      });
                    }}
                    type="size"
                    ActiveId={product.checkData.size?.id}
                    data={
                      product.checkData.color
                        ? product.checkData.color.sizes
                        : product.attribute.options[0].sizes
                    }
                  />
                </div>
              ) : (
                ""
              )}
              <div className="w-full  flex flex-col items-center gap-2 p-2 rounded-md ">
                <h2 className="font-medium italic py-2">{t("qte")}</h2>
                <div className="flex md:flex-row flex-col gap-2 justify-between">
                  <div className="">
                    <Qte
                      className="max-sm:m-auto max-sm:w-full"
                      addClick={() => {
                        setProduct({
                          ...product,
                          qte: product.qte + 1,
                          ...(product.hasOffer &&
                            product.minNumberQteOffer &&
                            product.priceOffer
                            ? {
                              ...(product.qte + 1 >= product.minNumberQteOffer
                                ? {
                                  price: product.priceOffer,
                                }
                                : {
                                  price: data.price,
                                }),
                            }
                            : {}),
                        });
                      }}
                      removeClick={() => {
                        setProduct({
                          ...product,
                          qte: product.qte - 1,
                          ...(product.hasOffer &&
                            product.minNumberQteOffer &&
                            product.priceOffer
                            ? {
                              ...(product.qte - 1 >= product.minNumberQteOffer
                                ? {
                                  price: product.priceOffer,
                                }
                                : {
                                  price: data.price,
                                }),
                            }
                            : {}),
                        });
                      }}
                      value={product.qte}
                      large={true}
                    />
                  </div>
                  {!isOnePage ? (
                    <Button
                      onClick={() => {
                        if (product.addons.length == 0) {
                          addToCart();
                          return;
                        }
                        if (!isValid()) {
                          toast.warning(
                            t("please_select_att") +
                            " " +
                            product.attribute.name
                          );
                          return;
                        }
                        setOpenAddon(true);
                      }}
                      className={
                        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-primary cursor-pointer   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"
                      }
                    >
                      <FiShoppingCart className="text-xl" />
                      <div className="me-2"></div>
                      {t("add_to_order")}
                    </Button>
                  ) : null}
                  {/* {isOnePage && product.addons.length ? (
                    <Button
                      onClick={() => {
                        setOpenAddon(true);
                      }}
                      className={
                        "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-primary cursor-pointer   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"
                      }
                    >
                      <FiShoppingCart className="text-xl" />
                      <div className="me-2"></div>
                      {t("add_to_cart")}
                    </Button>
                  ) : null} */}
                </div>
                <div className="w-full">
                  <AddonsView
                    open={openAddon}
                    addToCart={addToCart}
                    prod={product}
                    setOpen={setOpenAddon}
                    setProd={setProduct}
                  />
                </div>
                <Button
                  onClick={() => {

                    if (!isValid()) {
                      toast.warning(
                        t("please_select_att") +
                        " " +
                        product.attribute.name
                      );
                      return;
                    }
                    addToCart();
                  }}
                  className={
                    "text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-primary cursor-pointer   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"
                  }
                >
                  <FiShoppingCart className="text-xl" />
                  <div className="me-2"></div>
                  {t("add_to_order")}
                </Button>

              </div>

              <div>
                <div className="flex flex-row items-center mt-5 justify-between w-full">
                  <FavoriteHandler isSmall={false} product={product} />
                  <SharProduct
                    slug={product.slugName}
                    facebookShare={setting.theme?.ProductSetting.facebookShare} twitterShare={setting.theme?.ProductSetting.twitterShare} whatsappShare={setting.theme?.ProductSetting.whatsappShare} />
                </div>
              </div>
            </Card>
          )}
          <div id="thank_you" />
          {hideForm || true ? null : isOnePage && (
            <SingleProductForm
              onCreate={() => {
                setdisaible(true);
                slowScrollToId("thank_you");
              }}
              type={type}

              attribute={product.attribute}
              setproducts={setproductCheckout}
              products={productCheckout}
            />
          )}
        </div>
      </div>
      {/* <AddonsView
        open={openAddon}
        addToCart={addToCart}
        prod={product}
        setOpen={setOpenAddon}
        setProd={setProduct}
      /> */}
    </div>
  );
};

export default ProductOptions;
