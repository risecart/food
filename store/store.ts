"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

// ✅ Safe fallback storage for SSR
const createNoopStorage = () => ({
  getItem(_key: string) {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: any) {
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    return Promise.resolve();
  },
});

const isServer = typeof window === "undefined";
const storage = isServer
  ? createNoopStorage()
  : require("redux-persist/lib/storage").default;

// ⬇ Your persisted slice
import themeSlice from "./slices/themeSlice";
import settingSlice from "./slices/settingSlice";
import cartSlice from "./slices/cartSlice";
import { cartMiddleware } from "./middleware/cartMiddleware";

// Only persist the cart slice
const cartPersistConfig = {
  key: "cart",
  storage,
};

const rootReducer = combineReducers({
  theme: themeSlice,
  setting: settingSlice,
  cart: persistReducer(cartPersistConfig, cartSlice),
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(cartMiddleware),
  });
};

export const store = makeStore();
export const persistor = persistStore(store);

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
