import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5001/api/products";

// Fetch all products
export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Fetch single product
export const fetchProduct = createAsyncThunk("products/fetchOne", async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.loading = true; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.selected = action.payload;
      });
  },
});

export default productSlice.reducer;
