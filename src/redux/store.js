import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    carts: cartReducer,
  },
});

// Automatically save carts to localStorage
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("carts", JSON.stringify(state.carts));
});

export default store;
