import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/auth/";

// Register
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(API_URL + "register", userData);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post(API_URL + "login", userData);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (profileData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.user.token;

      const res = await axios.put(
        "/api/users/profile",
        profileData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const user = JSON.parse(localStorage.getItem("user"));

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: user || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Register failed";
      })
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })
      .addCase(updateProfile.pending, (state) => {
    state.loading = true;
  })
  .addCase(updateProfile.fulfilled, (state, action) => {
    state.loading = false;
    state.user = action.payload; // refresh Redux state
  })
  .addCase(updateProfile.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload?.message || "Profile update failed";
  })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
