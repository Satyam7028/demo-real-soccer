import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/users";

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchAll", async (_, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Fetch single user
export const fetchUser = createAsyncThunk("users/fetchOne", async (id, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Update user
export const updateUser = createAsyncThunk("users/update", async ({ id, userData }, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.put(`${API_URL}/${id}`, userData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Delete user
export const deleteUser = createAsyncThunk("users/delete", async (id, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const userSlice = createSlice({
  name: "users",
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
      .addCase(fetchUsers.pending, (state) => { state.loading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.items.findIndex(u => u._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.items = state.items.filter(u => u._id !== action.payload);
      });
  },
});

export const { clearSelected } = userSlice.actions;
export default userSlice.reducer;
