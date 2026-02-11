"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslation } from "react-i18next";
import { FaExchangeAlt } from "react-icons/fa";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createExchangeZod } from "@/schema/traking";
import { z } from "zod";
import { TextareaGeneral } from "../ui/textarea";
import UploadImageSingle from "../UploadImageSingle";
import { Button } from "../ui/button";
import trackingService from "@/services/traking.service";
import { toast } from "sonner";

interface ExchangeModelProps {
  data: OrderFull;
  afterChange: () => void;
}

const ExchangeModel = ({ data, afterChange }: ExchangeModelProps) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const { mutateAsync, isPending } = trackingService.useExchange();
  const Shema = createExchangeZod(t);
  type Type = z.infer<typeof Shema>;
  const { handleSubmit, control } = useForm<Type>({
    resolver: zodResolver(Shema),
    defaultValues: {
      image_exchange: "",
      note_exchange: "",
    },
  });

  const exchange = async (dataSend: Type) => {
    mutateAsync({
      id_order_exchange: data.id,
      image_exchange: dataSend.image_exchange,
      note_exchange: dataSend.note_exchange,
    }).then(() => {
      toast.success(t("send_success"), {
        duration: 1000,
      });
      setOpen(false);
      afterChange();
    });
  };
  return (
    <Dialog open={open} onOpenChange={(state) => setOpen(state)}>
      <DialogTrigger className="flex flex-row gap-2 items-center hover:bg-accent p-2 rounded-md">
        {t("change")}
        <FaExchangeAlt />
      </DialogTrigger>
      <DialogContent className="md:min-w-4xl">
        <DialogHeader>
          <DialogTitle className="font-semibold text-2xl text-center uppercase">
            {t("change_ur_order")}
          </DialogTitle>
          <DialogDescription className="flex flex-col text-start gap-2 p-4 bg-blue-100 border border-blue-300 rounded-lg mt-2">
            <span>1 - {t("form_note1")}</span>
            <span>2 - {t("form_note2")}</span>
            <span>3 - {t("form_note3")}</span>
          </DialogDescription>
        </DialogHeader>
        <form>
          <Controller
            control={control}
            name="note_exchange"
            render={({ field: props, fieldState: { error } }) => (
              <TextareaGeneral
                className="min-h-40"
                lable={t("notes")}
                placeholder={t("notes")}
                error={error?.message}
                {...props}
              />
            )}
          />

          <Controller
            control={control}
            name="image_exchange"
            render={({ field: props, fieldState: { error } }) => (
              <div className="mt-5">
                <span className=" rizzui-textarea-label block text-sm mb-1.5 font-medium">
                  {t("upload_image")} *
                </span>
                <UploadImageSingle
                  className="min-h-[210px]"
                  setData={props.onChange}
                  imgSrc={props.value}
                  error={error?.message}
                />
              </div>
            )}
          />
          <div className="grid grid-cols-2 gap-2 mt-4 max-w-fit md:min-w-md float-end">
            <Button
              onClick={() => {
                setOpen(false);
              }}
              type="button"
              variant="outline"
              className="gap-2"
            >
              {t("cancel")}
            </Button>
            <Button
              loading={isPending}
              disabled={isPending}
              variant="default"
              type="button"
              onClick={handleSubmit(exchange)}
              className="gap-2"
            >
              {t("send")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeModel;
