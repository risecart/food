"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";

type PropsAttribute = {
  data: Array<Color | Size>;
  className?: string;
  ActiveId?: number | null;
  onClick: any;
  type?: "color" | "size";
};

const Attribute = ({
  data,
  className = "",
  ActiveId = null,
  onClick,
  type,
}: PropsAttribute) => {
  const { t, i18n } = useTranslation();
  return (
    <div className={" inline-block my-1" + className}>
      {data.map((el, k) => {
        let disable =
          type == "size" ? !el.underStock && el.stock <= 0 : el.stock <= 0;
        return (
          <Badge
          variant={"default"}
            className={`
            ${
              disable
                ? "line-through !text-gray-400  cursor-not-allowed"
                : "cursor-pointer   "
            } 
            whitespace-pre-wrap
            flex bg-accent font-medium text-gray-600 
            items-center justify-center m-1 text-base  p-2   rounded-sm min-w-[50px]
            ${ActiveId == el.id ? "  bg-primary underline" : ""}
            ${i18n.language != "ar" ? "float-left" : "float-right"}
           
            `}
            key={k}
            style={ActiveId == el.id ? { color: "#000" } : {}}
            onClick={() => {
              if (!disable) {
                onClick(el);
                return;
              }

              if (type == "color") {
                alert(
                  <div className="flex gap-1">
                    <span>{el.value}</span> {t("no_dispo")}
                  </div>
                );
                return;
              }
              if (type == "size") {
                alert(
                  <div className="flex gap-1">
                    <span>{el.value}</span> {t("no_dispo")}
                  </div>
                );
                return;
              }
            }}
          >
            {el.value}
          </Badge>
        );
      })}
    </div>
  );
};

export default Attribute;
