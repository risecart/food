"use client"

import { useTranslation } from "react-i18next";
import { IoClose } from "react-icons/io5";
import CartEmpty from "../CartEmpty";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart } from "@/store/slices/cartSlice";
import CartItem from "./CartItem";
import Currency from "../Currency";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CartViewResturant() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.cart);
  const getSubTotal = (dt: ProductCart) => {
    return (
      dt.price * dt.qte +
      (dt.checkData.addon?.reduce((a, b) => {
        return a + b.price * b.qte;
      }, 0) ?? 0)
    );
  };
  const getTotal = () => {
    let s = 0;
    for (let i = 0; i != cart.items.length; i++)
      s += getSubTotal(cart.items[i]);
    return s;
  };
  return (
    <>
      {cart.cartOpen && (
        <div
          className="animate-scalet border w-full max-w-2xl fixed left-1/2 bottom-3 
            -translate-x-1/2 z-50 bg-white flex flex-col
            rounded-lg h-full max-h-[500px] p-4
            shadow-black/20 shadow-xl"
        >
          <div className="flex items-center">
            <h1 className="text-lg font-semibold">{t("your_cart")}</h1>
            <div className="grow"></div>
            <button
              className=" "
              onClick={() => {
                dispatch(openCart(false));
              }}
            >
              <IoClose className="text-2xl" />
            </button>
          </div>

          <div className="border-b border-gray-200 mt-2"></div>
          {cart.items.length != 0 ? (
            <>
              <div className="grow py-2 overflow-auto">
                <div className="flex flex-col gap-2">
                  {cart.items.map((el, k) => {
                    return (
                      <CartItem data={el} index={k} key={k} onClose={()=>{
                    dispatch(openCart(false))
                  }} />
                    );
                  })}
                </div>
              </div>
              <div className="border-b border-gray-200 mt-2"></div>
              <div className="flex items-center font-semibold mt-2 mb-2">
                <h1 className="text-lg">{t("sub_total")}</h1>
                <div className="grow"></div>
                <h1 className="text-lg">
                  {getTotal().toFixed(2)} <Currency />
                </h1>
              </div>
              <Link className="w-full" href={"/checkout"}>
                <Button
                  onClick={()=>{
                    dispatch(openCart(false))
                  }}
                  className={
                    "customPrimary grow text-white mb-1 max-h-11 h-11 animate-vibre uppercase w-full"
                  }
                >
                  {t("order")}
                </Button>
              </Link>
            </>
          ) : (
            <CartEmpty />
          )}
        </div>
      )}
    </>
  );
}
