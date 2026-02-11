"use client";
import offerService from "@/services/offer.service";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateCartFull, videCart } from "@/store/slices/cartSlice";
import { useEffect } from "react";

export default function PriceInit() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const offerexisting = offerService.useExisting();
  const getPrice = (p: ProductCart) => {
    return p.oldPrice ?? p.price;
  };
  const updatePrices = () => {
    let data = cart.items.map((el) => {
      return {
        price_total: getPrice(el) * el.qte,
        price_item: getPrice(el),
        qte: el.qte,
        color: el.checkData.color?.value ?? "",
        size: el.checkData.size?.value ?? "",
        product: {
          id: el.id,
        },
      };
    });
    if (data.length == 0) return null;
    offerexisting
      .mutateAsync({
        data: data,
      })
      .then((res) => {
        dispatch(
          updateCartFull(
            cart.items.map((el) => {
              return {
                ...el,
                price:
                  res.find((item) => item.product.id == el.id)?.price_item ??
                  getPrice(el),
              };
            })
          )
        );
      })
      .catch(() => {
        dispatch(videCart());
      });
  };

  useEffect(() => {
    updatePrices();
  }, [cart.items.length, cart.items.reduce((a, b) => a + b.qte, 0)]);

  return null;
}
