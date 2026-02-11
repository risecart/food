"use Client";
import orderService from "@/services/order.service";
import { useAppSelector } from "@/store/hooks";
import {
  Dispatch,
  JSX,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import BoxPrice, { ValueBoxPrice } from "./BoxPrice";
import eventsService from "@/services/events.service";
import { Controller, FieldErrors, useForm } from "react-hook-form";
import { slowScrollTo, slowScrollToId } from "@/lib/slowScrollTo";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSchema } from "@/schema/chekout";
import { z } from "zod";
import ThankYou from "./ThankYou";
import { Card } from "../ui/card";
import CartItem from "../card/CartItem";
import Currency from "../Currency";
import { Input, InputGeneral } from "../ui/input";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import SelectWilaya from "../selecte/WilayaSelect";
import SelectCommune from "../selecte/CommuneSelect";
import { toast } from "sonner";
import ModelPromo from "../ModelPromo";
import MapInput from "../ui/map-input";

interface SingleProductFormProps {
  products: ProductCart[];
  setproducts: Dispatch<SetStateAction<ProductCart[]>>;
  attribute: Attribute;
  onCreate?: () => void;
  type?: "1" | "2";
}



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



export default function SingleProductForm({
  products,
  setproducts,
  attribute,
  type,
  onCreate,
}: SingleProductFormProps) {
  const { t } = useTranslation();
  const [Wilaya, SetWilaya] = useState<Wilaya | undefined>({
    "id": 31,
    "name": "Oran",
    "showDeliveryCostToTheOffice": false,
    "showDeliveryCostToTheHome": true,
    "deliveryCostToTheOffice": 400,
    "deliveryCostToTheHome": 300,
  });
  const [Commune, SetCommune] = useState<Commune | undefined>({
    "id": 3101,
    "name": "Oran",
    "showDeliveryCostToTheOffice": false,
    "showDeliveryCostToTheHome": true,
    "deliveryCostToTheOffice": 400,
    "deliveryCostToTheHome": 300
  },);
  const [PriceDelivery, SetPriceDelivery] = useState<ValueBoxPrice>();
  const [IsAbondedSend, SetIsAbondedSend] = useState<boolean>(false);
  const addOrder = orderService.useCreateOrder();
  const addOrderAbonded = orderService.useCreateAbonded();
  const { pixelId, tikTokId } = useAppSelector((state) => state.theme);
  const theme = useAppSelector((state) => state.theme.theme);
  const [pos, setPos] = useState<Position>();
  const [promoCode, setPromoCode] = useState("");
  const activePromo = orderService.useApplyPromo();
  const [promoModal, setPromoModal] = useState(false);
  const inputRefs = {
    fullName: useRef<HTMLInputElement>(null),
    contact_phone: useRef<HTMLInputElement>(null),
    to_wilaya_name: useRef<HTMLInputElement>(null),
    to_commune_name: useRef<HTMLInputElement>(null),
  };

  const view = {
    fullName: type === "1" ? true : !type ? true : false,
    contact_phone: type === "1" || type === "2" ? true : !type ? true : false,
    to_wilaya_name:false, //type === "1" || type === "2" ? false : !type ? true : false,
    to_commune_name:false, //type === "1" || type === "2" ? false : !type ? true : false,
  };
  const shema = createSchema(t, type);

  type Checkout = z.infer<typeof shema>;
  const [Thankyoudata, SetThankyoudata] = useState<Checkout>();
  const {
    handleSubmit,
    control,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm<Checkout>({
    resolver: zodResolver(shema),
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
    return products.reduce((sum, item) => sum + item.price * item.qte, 0);
  }, [products]);
  const Total = useMemo(() => {
    return TotalCard + (PriceDelivery?.price || 0) - (promoPrice || 0);
  }, [TotalCard, PriceDelivery, promoPrice]);

  // function to call backend
  //STARTE
  const CreateOrder = async (data: Checkout) => {
    data.contact_phone = "+213" + data.contact_phone.slice(1);
    const res = await addOrder.mutateAsync({
      ...data,
      to_wilaya_name: "Oran",
      to_commune_name: "Oran",
      address_lat: pos?.lat ? pos.lat + "" : undefined,
      address_lng: pos?.lng ? pos.lng + "" : undefined
    });
    if (res) {
      const data = getValues() as any;
      SetThankyoudata(data);
      eventsService.purchaseEvent(
        products,
        Total,
        data,
        pixelId ? "facebook" : ""
      );
      eventsService.purchaseEvent(
        products,
        Total,
        data,
        tikTokId ? "tiktok" : ""
      );
      setproducts([]);
      if (onCreate) onCreate();
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

  const CreateAbondend = async () => {
    const data = getValues() as any;
    data.contact_phone = "+213" + data.contact_phone.slice(1);
    data.email = "";
    data.items = products
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

  const [hideFixed, setHideFixed] = useState(false);
  const bottomButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideFixed(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    if (bottomButtonRef.current) {
      observer.observe(bottomButtonRef.current);
    }

    return () => {
      if (bottomButtonRef.current) {
        observer.unobserve(bottomButtonRef.current);
      }
    };
  }, [products]);

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
      products,
      TotalCard,
      tikTokId ? "tiktok" : ""
    );
    eventsService.initiateCheckoutEvent(
      products,
      TotalCard,
      pixelId ? "facebook" : ""
    );
  }, []);

  // update items in order
  useMemo(() => {
    if (products) {
      const items = products.map((item) => {
        return {
          name: item.name,
          price_item: item.price,
          price_total: item.price,
          color: item.checkData.color ? item.checkData.color?.value : "",
          size: item.checkData.size?.value ?? "",
          qte: item.qte,
          cancelled: false,
          product: { id: item.id },
        };
      });
      setValue("item", items);
    }
  }, [products]);

  useEffect(() => {
    if (products.length == 1) {
      slowScrollToId("here_form", 1000);
    }
  }, [products]);

  return addOrder.isSuccess && Thankyoudata ? (
    <ThankYou {...Thankyoudata} />
  ) : (
    products.length > 0 && (
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault(); // prevent default form submit
            if (products.length === 0) {
              toast.warning(t("please_select_att") + " " + attribute.name);
              slowScrollToId("scroll_here_att");
              return;
            }
            handleSubmit(CreateOrder, onError)(e);
          }}
          className="flex relative md:flex-row flex-col  gap-4 grid-cols-1 pt-10 p-2"
        >
          <Card className=" ml-auto h-fit   w-full shadow-none rounded-md  bg-accent border-none">
            <div className=" rounded-md p-3  ">
              <h1 id="here_form" className="text-center text-xl font-bold mb-6">
                {t("your_info2")}
              </h1>
              <div className="flex flex-col gap-2">
                {products.map((el, k) => {
                  return (
                    <CartItem
                      data={el}
                      index={k}
                      key={k}
                      isCheckout={true}
                      editable={true}
                      isOutCart
                      setProd={(value) =>
                        setproducts((prev) => {
                          if (!prev) return [];
                          if (value.qte === 0) {
                            return prev.filter((_, i) => i !== k);
                          }
                          return prev.map((product, i) =>
                            i === k ? value : product
                          );
                        })
                      }
                    />
                  );
                })}
              </div>
              <div className="flex flex-col  h-fit px-2  gap-4  w-full">
                {view.fullName && (
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
                )}

                {view.contact_phone && (
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
                )}

                {/* {view.to_wilaya_name && (
                  <Controller
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
                )}

                {view.to_commune_name && (
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
                  />
                )} */}
              </div>
              {[3103, 3105, 3101].includes(Commune?.id ?? 0) &&
                // modeDelivery.find((el) => el.check && el.isWaslet) && 
                (
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
                )}


              <div className="p-2 mt-5">
                <div className="flex mt-3 items-center">
                  <h1 className="text-lg uppercase font-semibold">
                    {t("sub_total")}
                  </h1>
                  <div className="grow"></div>
                  <span className="font-semibold">
                    {TotalCard.toFixed(2)} <Currency />
                  </span>
                </div>

                <div>
                  <Controller
                    control={control}
                    name="is_stopdesk"
                    render={({ field: { value, onChange } }) => (
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
                          product={products.map((x) => x.id)}
                        />
                      </>
                    )}
                  />
                </div>
                <hr className="border border-dashed border-gray-300 my-5" />
                <RadioGroup className="flex items-center pb-10">
                  <RadioGroupItem checked value="default" id="r1" />
                  <Label htmlFor="r1"> {t("cahch_ondeliv")}</Label>
                </RadioGroup>

                <div className="mt-0">
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
                      <span className="text-gray-500 font-semibold text-xs  md:flex hidden">
                        {t("promo_code")}
                      </span>
                    }
                    classNameInput="!bg-white ltr:pl-2 rtl:pr-2 text-sm rounded"
                    placeholder={t("enter_promo")}
                  />
                  {promoPrice ? (
                    <>
                      <div className="flex mt-3 items-center">
                        <h1 className=" text-lg uppercase font-semibold">
                          Promo price
                        </h1>
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

                <div className="flex mt-3 items-center">
                  <h1 className="text-lg  font-bold uppercase">{t("total")}</h1>
                  <div className="grow"></div>
                  <span className="font-bold text-2xl">
                    {Total.toFixed(2)}{" "}
                    <small className="font-bold">
                      <Currency />
                    </small>
                  </span>
                </div>
              </div>

              <Button
                ref={bottomButtonRef}
                loading={addOrder.isPending}
                type="submit"
                className={`customPrimary   grow text-white mb-3 max-h-11 h-11 mt-3 uppercase w-full`}
              >
                {t("confirm_order")}
              </Button>
              {!hideFixed && (
                <Button
                  loading={addOrder.isPending}
                  type="submit"
                  className={
                    "fixed bottom-0 left-0 right-0 max-w-xs m-auto text-white mb-3 max-h-11 h-11 mt-3 uppercase w-full z-50 " +
                    (theme?.ProductSetting.Cart.StickyOnDesktop
                      ? "md:block"
                      : "md:hidden") +
                    (theme?.ProductSetting.Cart.StickyOnMobile
                      ? " block"
                      : " hidden")
                  }
                >
                  {t("confirm_order")}
                </Button>
              )}
            </div>
          </Card>
          {promoPrice ? (
            <ModelPromo
              promo={promoPrice}
              open={promoModal}
              onOpenChange={(state) => setPromoModal(state)}
            />
          ) : null}
        </form>
      </div>
    )
  );
}
