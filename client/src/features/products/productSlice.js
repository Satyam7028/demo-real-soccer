import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/products";

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

// Create product
export const createProduct = createAsyncThunk("products/create", async (productData, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.post(API_URL, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Update product
export const updateProduct = createAsyncThunk("products/update", async ({ id, productData }, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.put(`${API_URL}/${id}`, productData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Delete product
export const deleteProduct = createAsyncThunk("products/delete", async (id, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
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
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);
      });
  },
});

export const { clearSelected } = productSlice.actions;
export default productSlice.reducer;
