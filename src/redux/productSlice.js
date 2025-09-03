import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",

  async () => {
    const { data } = await axios.get("https://dummyjson.com/products?limit=0");
    return data.products;
  }
);

const productSlice = createSlice({
  name: "products",

  initialState: {
    items: [],
    status: "idle",
    error: null,
    searchQuery: "",
  },

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery } = productSlice.actions;
export default productSlice.reducer;
