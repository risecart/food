"use client";
import { useTranslation } from "react-i18next";
import { Input, InputGeneral } from "../ui/input";
import SelectWilaya from "../selecte/WilayaSelect";
import SelectCommune from "../selecte/CommuneSelect";
import BoxPrice, { ValueBoxPrice } from "./BoxPrice";
import { useEffect, useMemo, useRef, useState } from "react";
import { Card } from "../ui/card";
import { TextareaGeneral } from "../ui/textarea";
import { useAppSelector } from "@/store/hooks";
import CartItem from "../card/CartItem";
import Currency from "../Currency";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

import { Controller, FieldErrors, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createChackoutZod } from "@/schema/chekout";
import orderService from "@/services/order.service";
import ThankYou from "./ThankYou";
import { z } from "zod";
import { redirect } from "next/navigation";
import ModelPromo from "../ModelPromo";
import { slowScrollTo } from "@/lib/slowScrollTo";
import eventsService from "@/services/events.service";
import MapInput from "../ui/map-input";



type FreeDelType = {
  [key: number]: {
    pos: { lat: number, lng: number }
  }
}
const FreeDel: FreeDelType = {
  3103: {
    pos: { lat: 35.721943, lng: -0.556764 }
  },
  3101: {
    pos: { lat: 35.693682, lng: -0.634728 }
  },
  3105: {
    pos: { lat: 35.647862, lng: -0.623873 }
  },
  0: {
    pos: { lat: 35.693682, lng: -0.634728 }
  },
}
type Position = {
  lat: number,
  lng: number
}

export default function FormFood() {
  // const
  const { t } = useTranslation();
  const cart = useAppSelector((state) => state.cart);
  const [Wilaya, SetWilaya] = useState<Wilaya>({
    "id": 31,
    "name": "Oran",
    "showDeliveryCostToTheOffice": false,
    "showDeliveryCostToTheHome": true,
    "deliveryCostToTheOffice": 400,
    "deliveryCostToTheHome": 300,
  });
  const [Commune, SetCommune] = useState<Commune>({
    "id": 3101,
    "name": "Oran",
    "showDeliveryCostToTheOffice": false,
    "showDeliveryCostToTheHome": true,
    "deliveryCostToTheOffice": 400,
    "deliveryCostToTheHome": 300
  });
  const [PriceDelivery, SetPriceDelivery] = useState<ValueBoxPrice>();
  const [IsAbondedSend, SetIsAbondedSend] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoModal, setPromoModal] = useState(false);
  const addOrder = orderService.useCreateOrder();
  const addOrderAbonded = orderService.useCreateAbonded();
  const activePromo = orderService.useApplyPromo();
  const { pixelId, tikTokId } = useAppSelector((state) => state.theme);
  const [pos, setPos] = useState<Position>();
  const inputRefs = {
    fullName: useRef<HTMLInputElement>(null),
    contact_phone: useRef<HTMLInputElement>(null),
    to_wilaya_name: useRef<HTMLInputElement>(null),
    to_commune_name: useRef<HTMLInputElement>(null),
  };

  // init Form
  //STARTE

  const Shema = createChackoutZod(t);
  type Checkout = z.infer<typeof Shema>;
  const [Thankyoudata, SetThankyoudata] = useState<Checkout>();
  const { handleSubmit, control, setValue, trigger, getValues } =
    useForm<Checkout>({
      resolver: zodResolver(Shema),
      defaultValues: {
        contact_phone: "",
        fullName: "",
        nots: "",
        price_promo: 0,
        to_commune_name: "Oran",
        to_wilaya_name: "Oran",
        freeshipping: false,
        do_insurance: false,
        has_exchange: false,
        item: [],
      },
    });
  //END

  const promoPrice = getValues("price_promo");
  // this for calcul price
  const TotalCard = useMemo(() => {
    return cart.items.reduce((sum, item) => sum + item.price * item.qte +
      +
      (item.checkData.addon?.reduce((a, b) => a + b.price * b.qte, 0) ?? 0), 0);
  }, [cart.items]);
  const Total = useMemo(() => {
    return TotalCard + (PriceDelivery?.price || 0) - (promoPrice || 0);
  }, [TotalCard, PriceDelivery, promoPrice]);

  // function to call backend
  //STARTE
  const CreateOrder = async (data: Checkout) => {

    data.contact_phone = "+213" + data.contact_phone.slice(1);
    const res = await addOrder.mutateAsync({
      ...data,
      address_lat: pos?.lat ? pos.lat + "" : undefined,
      address_lng: pos?.lng ? pos.lng + "" : undefined,

    });
    if (res) {
      const data = getValues() as any;
      SetThankyoudata(data);
      eventsService.purchaseEvent(
        cart.items,
        Total,
        data,
        pixelId ? "facebook" : ""
      );
      eventsService.purchaseEvent(
        cart.items,
        Total,
        data,
        tikTokId ? "tiktok" : ""
      );
    }
  };

  const onError = (errors: FieldErrors<Checkout>) => {
    const firstErrorField = Object.keys(errors)[0] as keyof typeof inputRefs;
    const ref = inputRefs[firstErrorField];

    if (ref?.current) {
      slowScrollTo(ref.current, 1000); // custom slow scroll
      ref.current.focus();
    }
  };
  const CreateAbondend = async () => {
    const data = getValues() as any;
    data.contact_phone = "+213" + data.contact_phone.slice(1);
    data.email = "";
    data.items = cart.items
      .map((el) => {
        return `${"name : " +
          el.name +
          " , " +
          " , " +
          "price total : " +
          el.price +
          " , " +
          "price item : " +
          el.price +
          " , " +
          "color : " +
          (el.checkData?.color?.value ?? "noColor") +
          " , " +
          "size : " +
          (el.checkData?.size?.value ?? "noSize") +
          " , " +
          "qte : " +
          el.qte +
          " , " +
          "product id : " +
          el.id +
          "----------------"
          }`;
      })
      .join("\n");
    const res = await addOrderAbonded.mutateAsync(data);
    if (res) {
      SetIsAbondedSend(true);
    }
  };
  //END

  // PROMO
  const applyPromo = async () => {
    if (promoCode != "") {
      const data = getValues() as any;
      const res = await activePromo.mutateAsync({
        data: data,
        promo: promoCode,
      });
      if (res) {
        setValue("price_promo", res.price_promo);
        setPromoModal(true);
      } else {
        setValue("price_promo", 0);
      }
    }
  };

  // change price delivery
  useEffect(() => {
    setValue("price_delivery", PriceDelivery?.price || 0);
  }, [PriceDelivery, setValue]);

  // change Total price
  useEffect(() => {
    setValue("price_items", TotalCard);
    setValue("price_total", Total);
  }, [TotalCard, Total, setValue]);

  //send Event
  useEffect(() => {
    eventsService.initiateCheckoutEvent(
      cart.items,
      TotalCard,
      tikTokId ? "tiktok" : ""
    );
    eventsService.initiateCheckoutEvent(
      cart.items,
      TotalCard,
      pixelId ? "facebook" : ""
    );
  }, []);

  // update items in order
  useMemo(() => {
    if (cart.items) {
      const items = cart.items.map((item) => {
        return {
          name: item.name,
          price_item: item.price,
          price_total: item.price,
          color: item.checkData.color ? item.checkData.color?.value : "",
          size: item.checkData.size?.value ?? "",
          qte: item.qte,

          cancelled: false,
          product: { id: item.id },
          subItems: item.checkData.addon?.map(el => {
            return {
              name: el.value,
              price_total: el.price * el.qte,
              price_item: el.price,
              qte: el.qte,
            }
          }) ?? []
        };
      });
      setValue("item", items);
    }
  }, [cart.items]);

  if (cart.items.length == 0 && !Thankyoudata) {
    return redirect("/");
  }

  return addOrder.isSuccess && Thankyoudata ? (
    <ThankYou {...Thankyoudata} />
  ) : (
    <div>
      <div className="my-8">
        <h1 className="text-center font-semibold text-2xl">{t("checkout")}</h1>
        <p className="text-center">{t("order_summary")}</p>
      </div>
      <form
        onSubmit={handleSubmit(CreateOrder, onError)}
        className="flex relative md:flex-row flex-col  gap-4 grid-cols-1 pt-10 p-2"
      >
        <div className="flex md:sticky top-20 flex-col  h-fit px-2 md:min-w-2xl  gap-4  w-full">
          <Controller
            control={control}
            name="fullName"
            render={({ field: props, fieldState: { error } }) => (
              <InputGeneral
                ref={inputRefs.fullName}
                lable={t("fullname")}
                classNameInput="!h-10 bg-accent"
                placeholder={t("fullname")}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onBlur={(e) => {
                  const fullName = e.target.value.trim();
                  setValue("firstname", fullName);
                  setValue("familyname", fullName);
                  setValue("lastName", fullName);
                }}
                type="text"
                error={error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="contact_phone"
            render={({ field: props, fieldState: { error } }) => (
              <InputGeneral
                ref={inputRefs.contact_phone}
                value={props.value}
                onChange={props.onChange}
                error={error?.message}
                lable={t("phone")}
                placeholder={t("phone")}
                classNameInput="!h-10 bg-accent"
                type="number"
                maxLength={10}
                onBlur={(e) => {
                  trigger("contact_phone").then(() => {
                    const phone = getValues("contact_phone");
                    if (phone && !IsAbondedSend) {
                      CreateAbondend();
                    }
                  });
                }}
              />
            )}
          />
          <div className="my-2">
            <label className="block mb-2 text-base font-semibold">
              Choisissez votre location
            </label>
            <MapInput
              pos={pos}
              setPos={setPos}
              center={FreeDel[Commune?.id ?? 0].pos}
            />
          </div>
          {/* <Controller
            control={control}
            name="to_wilaya_name"
            render={({ field: props, fieldState: { error } }) => {
              return (
                <SelectWilaya
                  ref={inputRefs.to_wilaya_name}
                  value={Wilaya}
                  onChange={(value) => {
                    if (value) {
                      SetWilaya(value);
                      props.onChange(value.name);
                    } else {
                      SetWilaya(undefined);
                      props.onChange("");
                    }
                  }}
                  error={error?.message}
                  className="bg-accent !h-10"
                  placeholder={t("wilaya")}
                  label={t("wilaya")}
                />
              );
            }}
          />

          <Controller
            control={control}
            name="to_commune_name"
            render={({ field: props, fieldState: { error } }) => {
              return (
                <SelectCommune
                  ref={inputRefs.to_commune_name}
                  value={Commune}
                  onChange={(value) => {
                    if (value) {
                      SetCommune(value);
                      props.onChange(value.name);
                    } else {
                      SetCommune(undefined);
                      props.onChange("");
                    }
                  }}
                  error={error?.message}
                  id_wilaya={Wilaya?.id}
                  className="bg-accent !h-10"
                  placeholder={t("commune")}
                  label={t("commune")}
                />
              );
            }}
          /> */}






        </div>
        <Card className=" ml-auto h-fit  w-full shadow-none rounded-md  bg-accent border-none">
          <div className=" rounded-md p-3  sticky top-[60px] ">
            <h1 className="text-center text-xl font-bold mb-6">
              {t("your_order")}
            </h1>
            <div className="flex flex-col gap-2">
              {cart.items.map((el, k) => {
                return (
                  <CartItem
                    data={el}
                    index={k}
                    key={k}
                    isCheckout={true}
                    editable={true}
                  />
                );
              })}
            </div>
            <div className="flex mt-3 items-center">
              <h1 className="text-lg font-medium">{t("sub_total")}</h1>
              <div className="grow"></div>
              <span className="font-semibold">
                {TotalCard.toFixed(2)} <Currency />
              </span>
            </div>

            <div>
              <Controller
                control={control}
                name="is_stopdesk"
                render={({
                  field: { value, onChange },
                  fieldState: { error },
                }) => (
                  <>
                    {Commune && (
                      <hr className="border border-dashed border-gray-300 my-5 " />
                    )}
                    <BoxPrice
                      label={t("delivery_mode")}
                      value={value}
                      onChange={(newBoxValue: ValueBoxPrice) => {
                        onChange(newBoxValue?.is_stopdesk ?? false);
                        setValue("stopdesk_id", newBoxValue.center_id);
                        SetPriceDelivery(newBoxValue);
                      }}
                      commune={Commune}
                      product={cart.items.map((x) => x.id)}
                    />
                    {Commune && (
                      <hr className="border border-dashed border-gray-300 my-5 " />
                    )}
                  </>
                )}
              />
            </div>
            <div className="mt-4">
              <Input
                suffix={
                  <Button
                    disabled={promoPrice != 0}
                    onClick={() => applyPromo()}
                    className="ltr:rounded-l-none rtl:rounded-r-none"
                    type="button"
                  >
                    {t("apply")}
                  </Button>
                }
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                prefixElement={
                  <span className="text-gray-500 font-semibold text-[12px]">
                    {t("promo_code")}
                  </span>
                }
                classNameInput="!bg-white ltr:pl-2 rtl:pr-2 rounded"
                placeholder={t("enter_promo")}
              />
              {promoPrice ? (
                <>
                  <div className="flex mt-3 items-center">
                    <h1 className=" font-medium">Promo price</h1>
                    <div className="grow"></div>
                    <span className="font-semibold">
                      -{promoPrice} <Currency />
                    </span>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
            <hr className="border border-dashed border-gray-300 my-5" />
            <RadioGroup className="flex items-center pb-10">
              <RadioGroupItem checked value="default" id="r1" />
              <Label htmlFor="r1"> {t("cahch_ondeliv")}</Label>
            </RadioGroup>
            <Controller
              control={control}
              name="nots"
              render={({ field: props, fieldState: { error } }) => (
                <TextareaGeneral
                  value={props.value}
                  onChange={props.onChange}
                  className="bg-accent min-h-30"
                  lable={t("note")}
                />
              )}
            />
            <div className="flex mt-3 items-center">
              <h1 className="text-lg font-bold uppercase">{t("total")}</h1>
              <div className="grow"></div>
              <span className="font-semibold text-2xl">
                {Total.toFixed(2)}{" "}
                <small className="!font-semibold">
                  <Currency />
                </small>
              </span>
            </div>

            <Button
              loading={addOrder.isPending}
              type="submit"
              className={`customPrimary grow text-white mb-3 max-h-11 h-11 mt-3 uppercase w-full`}
            >
              {t("confirm_order")}
            </Button>
          </div>
        </Card>
      </form>
      <ModelPromo
        promo={200}
        open={promoModal}
        onOpenChange={(state) => setPromoModal(state)}
      />
    </div>
  );
}
