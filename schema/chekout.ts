import { z } from "zod";

const Items = z.object({
  name: z.string(),
  price_total: z.number(),
  price_item: z.number(),
  color: z.string(),
  size: z.string(),
  qte: z.number(),
  cancelled: z.boolean(),
  product: z.object({
    id: z.number(),
  }),
  subItems: z.array(
    z.object({
      name: z.string(),
      price_total: z.number(),
      price_item: z.number(),
      qte: z.number(),
    })
  ).optional()
});

/*
const Checkout = z.object({
  fullName: z.string().min(1),
  contact_phone: z
    .string()
    .nonempty()
    .regex(/^0[5-7][0-9]{8}$/),
  to_commune_name: z.string().nonempty(),
  to_wilaya_name: z.string().nonempty(),
  nots: z.string(),
  stopdesk_id: z.number().optional(),
  is_stopdesk: z.boolean(),
  address: z.string().optional(),
  firstname: z.string(),
  lastName: z.string(),
  familyname: z.string(),
  email: z.string().optional(),
  time_delivery: z.number().optional(),
  address_lng: z.number().optional(),
  address_lat: z.number().optional(),
  has_exchange: z.boolean().optional(),
  freeshipping: z.boolean().optional(),
  do_insurance: z.boolean().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  length: z.number().optional(),
  weight: z.number().optional(),
  price_promo: z.number().optional(),
  price_total: z.number(),
  price_items: z.number(),
  price_delivery: z.number(),
  item: z.array(Items),
});*/

function createChackoutZod(t: any) {
  return z.object({
    fullName: z.string().min(1, {
      message: t("custom:full_name_required"),
    }),
    contact_phone: z
      .string()
      .nonempty({
        message: t("custom:phone_number_required"),
      })
      .regex(/^0[5-7][0-9]{8}$/),
    to_commune_name: z.string().nonempty({
      message: t("custom:commune_required"),
    }),
    to_wilaya_name: z.string().nonempty({
      message: t("custom:wilaya_required"),
    }),
    nots: z.string(),
    stopdesk_id: z.number().optional(),
    is_stopdesk: z.boolean(),
    address: z.string().optional(),
    firstname: z.string(),
    lastName: z.string(),
    familyname: z.string(),
    email: z.string().optional(),
    time_delivery: z.number().optional(),
    address_lng: z.number().optional(),
    address_lat: z.number().optional(),
    has_exchange: z.boolean().optional(),
    freeshipping: z.boolean().optional(),
    do_insurance: z.boolean().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    length: z.number().optional(),
    weight: z.number().optional(),
    price_promo: z.number().optional(),
    price_total: z.number(),
    price_items: z.number(),
    price_delivery: z.number(),
    item: z.array(Items),
  });
}

function createSchema(t: any, type?: "1" | "2") {
  switch (type) {
    case "1":
      return createChackoutZod(t).extend({
        to_commune_name: z.string().optional(),
        to_wilaya_name: z.string().optional(),
      });

    case "2":
      return createChackoutZod(t).extend({
        to_commune_name: z.string().optional(),
        to_wilaya_name: z.string().optional(),
        fullName: z.string().optional(),
        firstname: z.string().optional(),
        lastName: z.string().optional(),
        familyname: z.string().optional(),
      });

    default:
      return createChackoutZod(t);
  }
}

export { createSchema, Items, createChackoutZod };
