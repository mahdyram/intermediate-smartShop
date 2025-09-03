import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",

  async () => {
    const { data } = await axios.get(
      "https://dummyjson.com/products/category-list"
    );
    return data;
  }
);

export const categorySlice = createSlice({
  name: "categories",

  initialState: {
    items: [],
    status: "idle",
    error: null,
    selected: localStorage.getItem("selectedCategory") || "all-products",
  },

  reducers: {
    setCategory: (state, action) => {
      state.selected = action.payload;
      localStorage.setItem("selectedCategory", action.payload);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = ["all-products", ...action.payload];
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
