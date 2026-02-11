"use client";

import React from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/store/hooks";
import { openSearchDraw } from "@/store/slices/settingSlice";
//import { SliderRange } from "../ui/slider-range";

const SerchSections = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  /*const [value, setValue] = React.useState([30, 80]);
  const [from, to] = value;*/
  return (
    <div className="flex flex-initial mt-5 gap-2 items-center">
      <Input
        classNameInput="w-full px-3 h-10"
        className="w-full bg-white rounded-2xl"
        readOnly
        onClick={() => dispatch(openSearchDraw(true))}
        prefixElement={<Search />}
        placeholder={t("enter_prod_name")}
      />
      {/* <div className="w-full max-w-lg mx-auto">
        <div className="w-full flex items-center justify-between gap-2">
          <span className="text-sm text-muted-foreground">{from}</span>
          <SliderRange
            value={value}
            onValueChange={setValue}
            max={100}
            min={0}
            step={10}
          />
          <span className="text-sm text-muted-foreground">{to}</span>
        </div>
        <p className="mt-2 text-center text-sm text-muted-foreground"></p>
      </div>*/}
    </div>
  );
};

export default SerchSections;
