import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ProductCartUpdate = {
  item: ProductCart;
  index: number;
};

export interface Cart {
  items: Array<ProductCart>;
  faverites: Product[];
  cartOpen: boolean;
}

const initialState: Cart = {
  items: [],
  faverites: [],
  cartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductCart>) => {
      const index = state.items.findIndex(
        (el) =>
          el.id === action.payload.id &&
          el.checkData.color?.id === action.payload.checkData.color?.id &&
          el.checkData.size?.id === action.payload.checkData.size?.id
      );

      if (index !== -1 && !action.payload.checkData.addon?.length) {
        state.items = state.items.map((el, k) =>
          index === k
            ? {
                ...action.payload,
                qte: state.items[index].qte + action.payload.qte,
              }
            : el
        );
      } else {
        state.items.push(action.payload);
      }
    },

    addToCartItems: (state, action: PayloadAction<ProductCart[]>) => {
      state.items.push(...action.payload);
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((_, index) => index !== action.payload);
    },

    removeFromCartbyid: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },

    updateCart: (state, action: PayloadAction<ProductCartUpdate>) => {
      state.items[action.payload.index] = action.payload.item;
    },

    updateCartFull: (state, action: PayloadAction<Array<ProductCart>>) => {
      state.items = action.payload;
    },

    videCart: (state) => {
      state.items = [];
    },

    openCart: (state, action: PayloadAction<boolean>) => {
      state.cartOpen = action.payload;
    },
    addToFavorite: (state, action: PayloadAction<Product>) => {
      state.faverites.push(action.payload);
    },

    removeFromFavorite: (state, action: PayloadAction<number>) => {
      state.faverites = state.faverites.filter(
        (el) => el.id !== action.payload
      );
    },
  },
});

export const {
  addToCart,
  addToCartItems,
  removeFromCart,
  removeFromCartbyid,
  updateCart,
  updateCartFull,
  videCart,
  openCart,
  addToFavorite,
  removeFromFavorite
} = cartSlice.actions;

export const selectCart = (state: { cart: Cart }) => state.cart;

export default cartSlice.reducer;
