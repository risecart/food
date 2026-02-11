import { useTranslation } from "react-i18next";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import Qte from "../Qte";
import { Button } from "../ui/button";
import { FiShoppingCart } from "react-icons/fi";
import Addons from "../Addons";
import Image from "next/image";
import getImages from "@/lib/getImages";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface AddonsViewType {
  prod: ProductCart;
  open: boolean;
  addToCart: (e?: any) => void;
  setOpen: (e: any) => void;
  setProd: (e: ProductCart) => void;
}
function AddonsView({
  prod,
  open,
  setOpen,
  setProd,
  addToCart,
}: AddonsViewType) {
  const { t, i18n } = useTranslation();
  return (

    <>
      <div className="mt-2">
        <h2 className="font-medium italic max-sm:text-center">{t("extras_drinks")}</h2>
        {prod.addons.map((el, k) => {
          return (
            <div className="mt-2" key={k}>
              <h2 className="font-medium text-sm">{el.value}</h2>
              <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-3 mt-2">
                {el.items.map((item, index) => {
                  let it = prod.checkData.addon?.find(
                    (e) => e.id == item.id
                  );
                  let indexOfItem =
                    prod.checkData.addon?.findIndex(
                      (e) => e.id == item.id
                    ) ?? -1;
                  return (
                    <Addons
                      data={{ ...item, qte: it?.qte ?? 1 }}
                      isActive={!!it}
                      onClick={() => {
                        setProd({
                          ...prod,
                          checkData: {
                            ...prod.checkData,
                            addon: it
                              ? prod.checkData?.addon?.filter(
                                (e) => e.id != item.id
                              )
                              : [
                                ...(prod.checkData.addon ?? []),
                                { ...item, qte: 1 },
                              ],
                          },
                        });
                      }}
                      onDec={() => {
                        let p = { ...prod };
                        if (
                          indexOfItem >= 0 &&
                          p.checkData.addon &&
                          p.checkData.addon[indexOfItem].qte > 1
                        ) {
                          p.checkData.addon[indexOfItem].qte -= 1;

                          setProd(p);
                        }
                        if(p?.checkData?.addon?.[indexOfItem]?.qte === 1){
                          setProd({
                          ...prod,
                          checkData: {
                            ...prod.checkData,
                            addon: it
                              ? prod.checkData?.addon?.filter(
                                (e) => e.id != item.id
                              )
                              : [
                                ...(prod.checkData.addon ?? []),
                                { ...item, qte: 1 },
                              ],
                          },
                        });
                        }
                      }}
                      onInc={() => {
                        let p = { ...prod };
                        if (indexOfItem >= 0 && p.checkData.addon) {
                          p.checkData.addon[indexOfItem].qte += 1;
                          setProd(p);
                        }
                      }}
                      key={index}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>

  );
}

export default AddonsView;




/*

interface AddonsViewType {
  prod: ProductCart;
  open: boolean;
  addToCart: (e?: any) => void;
  setOpen: (e: any) => void;
  setProd: (e: ProductCart) => void;
}
function AddonsView({
  prod,
  open,
  setOpen,
  setProd,
  addToCart,
}: AddonsViewType) {
  const { t, i18n } = useTranslation();
  return (
    
      <Drawer
        noBodyStyles
        open={open}
        direction={i18n.language == "ar" ? "left" : "right"}
        onClose={() => setOpen(false)}
      >
        <DrawerContent className="!w-full sm:!w-[400px] !max-w-full">
          <DrawerHeader className="hidden">
            <DrawerTitle />
            <DrawerDescription />
          </DrawerHeader>
          <div className="max-h-[260px] min-h-[200px] transition-all duration-1000 group overflow-hidden relative">
            <h1 className="absolute bottom-0 z-10 capitalize tracking-wider left-0 right-0 p-3 pt-5 text-center text-xl font-bold bg-gradient-to-t from-black to-black/5 text-white">
              {prod.name.toUpperCase()}
            </h1>
            <Image
              src={getImages(prod.images[0], true)}
              alt={"Image produit " + prod.name}
              fill
              sizes="(max-width: 640px) 100vw, 400px"
              className="object-cover"
            />
            <DrawerClose
              asChild
              className="w-full absolute left-2 top-2 bg-white z-10"
            >
              <Button
                variant={"ghost"}
                className="rounded-full ltr:ml-auto rtl:mr-auto w-10 h-10"
              >
                {i18n.language == "ar" ? (
                  <ArrowLeft className="!w-5 !h-5" />
                ) : (
                  <ArrowRight className="!w-5 !h-5" />
                )}
              </Button>
            </DrawerClose>
          </div>

          <div className="px-7 mt-10 ">
            <div className="mt-2">
              <h2 className="font-medium italic">{t("qte")}</h2>
              <div className="flex mt-2 gap-2">
                <Qte
                  addClick={() => {
                    setProd({
                      ...prod,
                      qte: prod.qte + 1,
                      ...(prod.hasOffer &&
                      prod.minNumberQteOffer &&
                      prod.priceOffer
                        ? {
                            ...(prod.qte + 1 >= prod.minNumberQteOffer
                              ? {
                                  price: prod.priceOffer,
                                }
                              : {
                                  price: prod.price,
                                }),
                          }
                        : {}),
                    });
                  }}
                  removeClick={() => {
                    setProd({
                      ...prod,
                      qte: prod.qte - 1,
                      ...(prod.hasOffer &&
                      prod.minNumberQteOffer &&
                      prod.priceOffer
                        ? {
                            ...(prod.qte - 1 >= prod.minNumberQteOffer
                              ? {
                                  price: prod.priceOffer,
                                }
                              : {
                                  price: prod.price,
                                }),
                          }
                        : {}),
                    });
                  }}
                  value={prod.qte}
                  large={true}
                />
              </div>
            </div>
            <div className="mt-2">
              <h2 className="font-medium italic">{t("addons")}</h2>
              {prod.addons.map((el, k) => {
                return (
                  <div className="mt-2" key={k}>
                    <h2 className="font-medium text-sm">{el.value}</h2>
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {el.items.map((item, index) => {
                        let it = prod.checkData.addon?.find(
                          (e) => e.id == item.id
                        );
                        let indexOfItem =
                          prod.checkData.addon?.findIndex(
                            (e) => e.id == item.id
                          ) ?? -1;
                        return (
                          <Addons
                            data={{ ...item, qte: it?.qte ?? 1 }}
                            isActive={!!it}
                            onClick={() => {
                              setProd({
                                ...prod,
                                checkData: {
                                  ...prod.checkData,
                                  addon: it
                                    ? prod.checkData?.addon?.filter(
                                        (e) => e.id != item.id
                                      )
                                    : [
                                        ...(prod.checkData.addon ?? []),
                                        { ...item, qte: 1 },
                                      ],
                                },
                              });
                            }}
                            onDec={() => {
                              let p = { ...prod };
                              if (
                                indexOfItem >= 0 &&
                                p.checkData.addon &&
                                p.checkData.addon[indexOfItem].qte > 1
                              ) {
                                p.checkData.addon[indexOfItem].qte -= 1;

                                setProd(p);
                              }
                            }}
                            onInc={() => {
                              let p = { ...prod };
                              if (indexOfItem >= 0 && p.checkData.addon) {
                                p.checkData.addon[indexOfItem].qte += 1;
                                setProd(p);
                              }
                            }}
                            key={index}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-10">
              <Button
                onClick={() => {
                  setOpen(false);
                  addToCart();
                }}
                className={
                  "text-gray-900 w-full bg-white border border-gray-300 focus:outline-none hover:bg-gray-100   font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 grow  flex items-center justify-center"
                }
              >
                <FiShoppingCart className="text-xl" />
                <div className="me-2"></div>
                {t("add_to_cart")}
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
   
  );
}
*/
