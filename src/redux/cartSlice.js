import { createSlice } from "@reduxjs/toolkit";

const roundToTwo = (num) => Math.round(num * 100) / 100;

const savedCart = JSON.parse(localStorage.getItem("carts")) || {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const initialState = {
  ...savedCart,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalQuantity += 1;
      state.totalPrice = roundToTwo(state.totalPrice + product.price);
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      state.totalQuantity -= existingItem.quantity;
      state.totalPrice = roundToTwo(
        state.totalPrice - existingItem.price * existingItem.quantity
      );
      state.items = state.items.filter((item) => item.id !== id);
    },

    decrementQuantity: (state, action) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);

      item.quantity -= 1;
      state.totalQuantity -= 1;
      state.totalPrice = roundToTwo(state.totalPrice - item.price);

      if (item.quantity === 0) {
        state.items = state.items.filter((i) => i.id !== id);
      }
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, decrementQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
