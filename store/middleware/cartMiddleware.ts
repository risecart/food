import { Middleware } from "@reduxjs/toolkit";
import { addToCart, addToFavorite } from "../slices/cartSlice";
import eventsService from "@/services/events.service";

export const cartMiddleware: Middleware = (store) => (next) => (action) => {
  if (addToFavorite.match(action)) {
    const data = action.payload;
    const state = store.getState();
    const pixelId = state.setting?.pixelId;
    eventsService.addToWishlistEvent(data, pixelId ? "facebook" : "");
  }

  if (addToCart.match(action)) {
    const data = action.payload;
    const state = store.getState();
    const pixelId = state.setting?.pixelId;
    eventsService.addToCartEvent(data, pixelId ? "facebook" : "");
  }

  return next(action);
};
