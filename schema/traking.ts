import { z } from "zod";

function createTrakingZod(t: any) {
  return z.object({
    phone: z
      .string()
      .nonempty({
        message: t("custom:phone_number_required"),
      })
      .regex(/^0[5-7][0-9]{8}$/),
  });
}

function createExchangeZod(t: any) {
  return z.object({
    note_exchange: z.string().nonempty(),
    image_exchange:z.string().nonempty(),
  });
}
export { createTrakingZod,createExchangeZod };
