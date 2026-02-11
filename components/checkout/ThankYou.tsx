"use client";
import { useTranslation } from "react-i18next";
import { BsPatchCheckFill } from "react-icons/bs";
import Currency from "../Currency";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAppDispatch } from "@/store/hooks";
import { useEffect } from "react";
import { videCart } from "@/store/slices/cartSlice";

export default function ThankYou(data: any) {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(videCart());
  }, []);
  return (
    <>
      <div className="flex flex-col items-center mt-6">
        <BsPatchCheckFill className="text-primary w-12 h-12" />
        <h1 className="text-center text-xl font-bold mt-6">
          {t("order_valid")}
        </h1>
        <p className="mt-2 max-w-2xl text-center">{t("order_valid_msg")}</p>
        <div className="bg-[#F1F1F1] rounded-md p-5 w-full max-w-4xl mt-4 flex justify-center">
          <div className="flex items-center justify-center flex-col">
            <span>{t("total")} :</span>
            <strong>
              {data.price_total?.toFixed(2)} <Currency />
            </strong>
          </div>
          <div className="me-3"></div>
          <div className="flex items-center justify-center flex-col">
            <span>{t("payment_methode")} :</span>
            <strong>{t("cahch_ondeliv")}</strong>
          </div>
        </div>
        <div className="p-3 border border-gray-200 rounded-md w-full max-w-4xl mt-2">
          <h1 className="text-center font-semibold text-lg">
            {t("order_details")}
          </h1>
          <div className="flex items-center ">
            <div>{t("product")}</div>
            <div className="grow"></div>
            <div>{t("price")}</div>
          </div>
          <div className="border border-dashed border-gray-200 mt-2"></div>
          {data.item.map((el: any, k: number) => {
            return (
              <div className="flex items-center mt-2" key={k}>
                <div className="flex flex-col leading-4 text-sm ">
                  <div className="">
                    {el.name} x <strong>{el.qte}</strong>
                  </div>
                  {!!el.color && (
                    <div className="">
                      <small>
                        Color : <strong>{el.color}</strong>
                      </small>
                    </div>
                  )}
                  {!!el.size && (
                    <div className="">
                      <small>
                        Size : <strong>{el.size}</strong>
                      </small>
                    </div>
                  )}
                </div>
                <div className="grow"></div>
                <div className="text-sm font-bold">
                  {el.price_item?.toFixed(2)} <Currency />
                </div>
              </div>
            );
          })}
          <div className="border border-dashed border-gray-200 mt-2"></div>
          <div className="flex items-center mt-2">
            <div>Sous-Total</div>
            <div className="grow"></div>
            <div className="font-semibold">
              {data.price_items?.toFixed(2)} <Currency />
            </div>
          </div>
          <div className="flex items-center ">
            <div>{t("payment_methode")}</div>
            <div className="grow"></div>
            <div className="font-semibold">{t("cahch_ondeliv")}</div>
          </div>
          <div className="border border-dashed border-gray-200 mt-3"></div>
          <div className="flex items-center mt-4 text-xl font-semibold">
            <div>{t("total")}</div>
            <div className="grow"></div>
            <div className=" text-2xl font-bold">
              {data.price_total?.toFixed(2)} <Currency />
            </div>
          </div>
        </div>
        <Link href={"/"}>
          <Button
            className={`!bg-primary grow text-white mb-3 max-h-11 h-11 mt-3`}
          >
            {t("return_tohome")}
          </Button>
        </Link>
      </div>
    </>
  );
}
