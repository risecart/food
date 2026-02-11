"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { TbCubeSend } from "react-icons/tb";
import { InputGeneral } from "../ui/input";
import { MdContentCopy, MdLocalPhone } from "react-icons/md";
import { LoadingSpinner } from "../ui/loading-spinner";
import trackingService from "@/services/traking.service";
import { z } from "zod";
import { createTrakingZod } from "@/schema/traking";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoSearchOutline } from "react-icons/io5";
import moment from "moment";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import StateOrderBudg from "../StateOrderBudg";
import { formatPhoneNumber } from "@/lib/formatPhone";
import { Avatar, AvatarImage } from "../ui/avatar";
import getPlatformUrl from "@/lib/Platform";
import { toast } from "sonner";
import { CopyText } from "@/lib/copyText";
import ExchangeModel from "./ExchangeModel";

export const TrakingOrder = () => {
  const { t, i18n } = useTranslation();
  // server
  const { data, error, isPending, mutateAsync } = trackingService.useTracking();
  const Shema = createTrakingZod(t);
  type Type = z.infer<typeof Shema>;
  const { handleSubmit, control, setValue, trigger, getValues } = useForm<Type>(
    {
      resolver: zodResolver(Shema),
      defaultValues: {
        phone: "",
      },
    }
  );

  const getTraking = async (data: Type) => {
    await mutateAsync({
      phone: "+213" + parseInt(data.phone),
    });
  };

  const isLessThanThreeDays = (date: string) => {
    const startDate = moment();
    const endDate = moment(date);
    const differenceInDays = startDate.diff(endDate, "days");
    return differenceInDays < 3;
  };

  return (
    <form onSubmit={handleSubmit(getTraking)}>
      <div className="flex justify-center items-center mt-6 p-3 flex-col gap-5">
        <TbCubeSend className=" w-28 h-28 text-primary opacity-80" />
        <h1 className="text-center font-semibold text-xl">
          {t("tracking_title")}
        </h1>
        <p className="text-center max-w-md text-sm">{t("tracking_subtitle")}</p>
        <div className="flex items-center flex-col  max-w-xs w-full">
          <Controller
            control={control}
            name="phone"
            render={({ field: props, fieldState: { error } }) => (
              <InputGeneral
                dir={i18n.language == "ar" ? "rtl" : "ltr"}
                type="tel"
                classNameInput="border-none shadow-none !ring-0 !outline-none "
                classNamelable="!p-0 !m-0"
                error={error?.message}
                value={props.value}
                onBlur={props.onBlur}
                onChange={props.onChange}
                prefixElement={<MdLocalPhone className=" w-5 h-5" />}
                suffix={
                  isPending ? (
                    <LoadingSpinner className="text-primary" />
                  ) : (
                    <>
                      <button
                        className="bg-transparent p-2 cursor-pointer hover:text-primary  text-black shadow-none"
                        type="submit"
                      >
                        <IoSearchOutline className="w-5 h-5" />
                      </button>
                    </>
                  )
                }
                className="border-1 border-black p-1 rounded-md"
                placeholder={t("phone")}
              />
            )}
          />
        </div>
      </div>
      {data?.length ? (
        <Table className="max-w-5xl m-auto mt-10">
          <TableHeader className="border-t h-14">
            <TableRow>
              {[
                t("id"),
                t("date"),
                t("state"),
                t("phone"),
                t("fullname"),
                t("wilaya"),
                t("commune"),
                t("platform"),
                t("tracking"),
                " ",
              ].map((header, index) => (
                <TableHead className="capitalize font-semibold " key={index}>
                  {header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((el, index) => (
              <TableRow key={index} className="h-20 text-center">
                <TableCell># {el.id}</TableCell>
                <TableCell>
                  <div className="whitespace-nowrap flex flex-col items-center">
                    <span className="text-[12px] font-bold">
                      {moment(el.created_at).format("YYYY-MM-DD")}
                    </span>
                    <span className="text-[12px] ">
                      {moment(el.created_at).fromNow()}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StateOrderBudg
                    state={el.state}
                    subStatus={el.subStatus}
                    type="default"
                  />
                </TableCell>
                <TableCell className="font-semibold">
                  {formatPhoneNumber(el.contact_phone)}
                </TableCell>
                <TableCell>
                  {el.firstname} {el.familyname}
                </TableCell>
                <TableCell className="font-semibold">
                  {el.to_wilaya_name}
                </TableCell>
                <TableCell className="font-semibold">
                  {el.to_commune_name}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {el.platform ? (
                      <Avatar>
                        <AvatarImage
                          className="ring-2 ring-primary ring-offset-background ring-offset-2"
                          src={getPlatformUrl(el.platform)}
                        />
                      </Avatar>
                    ) : (
                      <span className="text-sm text-gray-400 font-semibold whitespace-nowrap">
                        {t("not_exist")}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {el.tracking ? (
                    <div
                      className="mb-0.5 whitespace-nowrap !text-sm font-medium bg-green-100 leading-3 rounded-full text-green-700 p-2 py-1 cursor-pointer flex items-center"
                      onClick={() => {
                        CopyText(el.tracking ?? "");
                        toast.success(t("copied_text"));
                      }}
                    >
                      {el.tracking}
                      <div className="me-1"></div>
                      <MdContentCopy />
                    </div>
                  ) : (
                    <div className=" !text-sm whitespace-nowrap font-medium bg-red-100  rounded-full text-red-700 p-2 py-1">
                      {t("not_exist")}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    {isLessThanThreeDays(el.updated_at) &&
                      (el.state == "Livré" || el.state == "payed") && (
                        <ExchangeModel data={el} afterChange={() => {}} />
                      )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        ""
      )}
    </form>
  );
};
