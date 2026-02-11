"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import locationsService from "@/services/locations.service";
import { useTranslation } from "react-i18next";
import Currency from "../Currency";
import { useEffect, useMemo } from "react";

export interface ValueBoxPrice {
  is_stopdesk: boolean;
  price?: number | null;
  center_id?: number;
}

type Props = {
  label?: string;
  value?: boolean;
  onChange?: (value: ValueBoxPrice) => void;
  required?: boolean;
  error?: string;
  commune?: Commune;
  product?: number[];
};

export default function BoxPrice({
  label,
  value,
  onChange,
  error,
  commune,
  product,
}: Props) {
  const { t, i18n } = useTranslation();
  const { data, refetch } = locationsService.useGetCommunePrice({
    limit: 500,
    page: 1,
    product: product,
    id_commune: commune?.id,
  });

  useEffect(() => {
    if (product?.length && commune) {
      refetch();
    }
  }, [product?.length, commune?.id]);

  useEffect(() => {
    if (onChange && value) {
      onChange({
        is_stopdesk: true,
        price: data?.priceDeliveryOffice,
        center_id: data?.center_id,
      });
    }
    if (onChange && !value) {
      onChange({
        is_stopdesk: false,
        price: data?.priceDeliveryHome,
        center_id: data?.center_id,
      });
    }
  }, [data]);

  if (!data && commune) {
    return (
      <div className="space-y-1">
        <p className="text-sm text-red-500">{t("city_err_price")}</p>
      </div>
    );
  }

  return (
    commune && (
      <div className="space-y-1">
        {label && <Label className="text-lg  uppercase font-semibold">{label}</Label>}
        <RadioGroup
          value={value ? "1" : "0"}
          onValueChange={(value) => {
            if (value == "1" && onChange && data) {
              onChange({
                is_stopdesk: true,
                price: data?.priceDeliveryOffice,
                center_id: data.center_id,
              });
            }
            if (value == "0" && onChange && data) {
              onChange({
                is_stopdesk: false,
                price: data?.priceDeliveryHome,
                center_id: data.center_id,
              });
            }
          }}
          dir={i18n.language == "ar" ? "rtl" : "ltr"}
          className={cn("gap-4 mt-2", "flex flex-col")}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem id="home_delivery" value={"0"} />
            <Label
              htmlFor="home_delivery"
              className="flex flex-row justify-between w-full"
            >
              <span> {t("home_delivery")}</span>
              <span className="font-semibold">
                {data?.priceDeliveryHome.toString()} <Currency />{" "}
              </span>
            </Label>
          </div>

          {data?.priceDeliveryOffice && (
            <div className="flex items-center space-x-2">
              <RadioGroupItem id="office_delivery" value={"1"} />
              <Label
                className="flex flex-row justify-between w-full"
                htmlFor="office_delivery"
              >
                <span> {t("office_delivery")}</span>
                <span className="font-semibold">
                  {data?.priceDeliveryOffice.toString()} <Currency />{" "}
                </span>
              </Label>
            </div>
          )}
        </RadioGroup>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    )
  );
}
