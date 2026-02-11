"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import locationsService from "@/services/locations.service";

import { cn } from "@/lib/utils"; // utility to merge class names
import { Label } from "../ui/label";
import { useTranslation } from "react-i18next";

export default function SelectWilaya({
  value,
  onChange,
  label,
  className,
  error,
  placeholder,
  ref,
}: {
  value?: Wilaya;
  onChange?: (value?: Wilaya) => void;
  label?: string;
  className?: string;
  placeholder?: string;
  ref?: React.Ref<any> | undefined;
  error?: string;
}) {
  const [search, setSearch] = useState("");

  const { i18n } = useTranslation();

  const { data } = locationsService.useGetWilaya({
    limit: 100,
    page: 1,
  });

  const filteredWilayas = data?.data.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className=" w-full">
      {label && <Label className="pb-2">{label}</Label>}

      <Select
        dir={i18n.language == "ar" ? "rtl" : "ltr"}
        value={value ? JSON.stringify(value) : ""}
        onValueChange={(val) => {
          try {
            const parsed = JSON.parse(val);
            if (onChange) onChange(parsed);
          } catch {
            if (onChange) onChange(undefined);
          }
        }}
      >
        <SelectTrigger
          ref={ref}
          className={cn(
            "w-full  border bg-transparent shadow-none",
            error && "border-red-500 focus:ring-red-500",
            className
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <div className="px-2 py-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
              className="w-full px-2 py-2 text-sm rounded-md border border-input bg-background text-foreground"
            />
          </div>

          {filteredWilayas?.map((wilaya) => (
            <SelectItem key={wilaya.id} value={JSON.stringify(wilaya)}>
              {wilaya.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
