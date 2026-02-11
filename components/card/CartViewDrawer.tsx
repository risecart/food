"use client";
import { useTranslation } from "react-i18next";
import CartEmpty from "../CartEmpty";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { openCart } from "@/store/slices/cartSlice";
import CartItem from "./CartItem";
import Currency from "../Currency";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerOverlay,
  DrawerTitle,
} from "../ui/drawer";

import { IoClose } from "react-icons/io5";
import { Badge } from "../ui/badge";
import { FiShoppingCart } from "react-icons/fi";

interface CartViewDrawerProps {
  className?: string;
}

export default function CartViewDrawer({ className }: CartViewDrawerProps) {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const cart = useAppSelector((state) => state.cart);

  const getSubTotal = (dt: ProductCart) => {
    return (
      dt.price * dt.qte +
      (dt.checkData.addon?.reduce((a, b) => a + b.price * b.qte, 0) ?? 0)
    );
  };

  const getTotal = () => {
    return cart.items.reduce((acc, item) => acc + getSubTotal(item), 0);
  };

  return (
    <div className={className}>
      <div onClick={() => dispatch(openCart(true))} className="cursor-pointer">
        <Button
          aria-label="Cart View"
          variant={"ghost"}
          className={`relative !py-1 min-w-9 h-9 shadow-none ${
            getTotal().toFixed(2) ? " !text-black" : "bg-accent"
          }  hover:${
            getTotal().toFixed(2) ? "md:bg-accent !text-black" : "bg-primary"
          } cursor-pointer text-black rounded-full  ${
            cart.items.length != 0 ? " bg-accent" : " "
          }  `}
        >
          {cart.items.length !== 0 ? (
            <Badge className="h-5 min-w-5 rounded-full px-1 absolute -top-1 right-0">
              {cart.items.length}
            </Badge>
          ) : (
            <div className="h-5 min-w-5 absolute -top-1 right-0" />
          )}
          <FiShoppingCart className="!w-4 !h-4" />

          <span
            className={`text-[14px] md:flex hidden ${
              cart.items.length != 0 ? " md:block" : " md:hidden"
            }`}
          >
            {getTotal().toFixed(2)} <Currency />
          </span>
        </Button>
      </div>
      <Drawer
        open={cart.cartOpen}
        onClose={() => dispatch(openCart(false))}
        autoFocus
        direction={i18n.language != "ar" ? "right" : "left"}
      >
        <DrawerOverlay className="fixed inset-0 bg-black/5 backdrop-blur-md z-40" />
        <DrawerContent className="!w-full sm:!w-[500px] !max-w-full  bg-gradient-to-b from-accent from-0% to-20% to-white ">
          <DrawerHeader className="p-0">
            <DrawerTitle className="text-lg font-semibold h-14 flex gap-2 p-2 flex-row items-center">
              <DrawerClose className="text-2xl cursor-pointer ">
                <IoClose />
              </DrawerClose>
              {t("your_cart")}
            </DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
          {cart.items.length !== 0 ? (
            <>
              <div className="grow pb-10 overflow-auto">
                <div className="flex flex-col gap-3">
                  {cart.items.map((el, k) => (
                    <div key={k}>
                      <hr className="w-full border-t border-dashed border-gray-400" />
                      <CartItem
                        data={el}
                        index={k}
                        onClose={() => dispatch(openCart(false))}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center font-semibold pb-5 px-2">
                <h1 className="text-lg">{t("sub_total")}</h1>
                <div className="grow" />
                <span
                  className={`text-[14px] whitespace-nowrap md:flex hidden text-end`}
                >
                  {cart.items.length !== 0 ? `${getTotal().toFixed(2)} ` : ""}
                  <Currency />
                </span>
              </div>

              <Link href="/checkout" className="w-full pb-2 px-2">
                <Button
                  onClick={() => dispatch(openCart(false))}
                  className="customPrimary grow text-white mb-1 max-h-11 h-11 animate-vibre uppercase w-full"
                >
                  {t("order")}
                </Button>
              </Link>
              <Link href="/categories" className="w-full pb-2 px-2">
                <Button
                  onClick={() => dispatch(openCart(false))}
                  className="customPrimary grow bg-accent hover:bg-black hover:text-white  text-black mb-1 max-h-11 h-11 animate-vibre uppercase w-full"
                >
                  {t("continue_shopping")}
                </Button>
              </Link>
            </>
          ) : (
            <CartEmpty />
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}
