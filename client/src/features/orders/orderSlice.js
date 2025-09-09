import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserOrders = createAsyncThunk(
  "orders/fetchUserOrders",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.token;
      const response = await axios.get("/api/orders/myorders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.token;
      const response = await axios.get("/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.token;
      const response = await axios.put(`/api/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/delete",
  async (id, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.token;
      await axios.delete(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch orders";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to update order status";
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(order => order._id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.error = action.payload?.message || "Failed to delete order";
      });
  },
});

export default orderSlice.reducer;
