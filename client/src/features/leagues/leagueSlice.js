import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/leagues";

// Fetch all leagues
export const fetchLeagues = createAsyncThunk("leagues/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Fetch single league
export const fetchLeague = createAsyncThunk("leagues/fetchOne", async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
});

// Create league
export const createLeague = createAsyncThunk("leagues/create", async (leagueData, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.post(API_URL, leagueData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Update league
export const updateLeague = createAsyncThunk("leagues/update", async ({ id, leagueData }, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.put(`${API_URL}/${id}`, leagueData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Delete league
export const deleteLeague = createAsyncThunk("leagues/delete", async (id, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const leagueSlice = createSlice({
  name: "leagues",
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
      .addCase(fetchLeagues.pending, (state) => { state.loading = true; })
      .addCase(fetchLeagues.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLeagues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchLeague.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createLeague.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateLeague.fulfilled, (state, action) => {
        const index = state.items.findIndex(l => l._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteLeague.fulfilled, (state, action) => {
        state.items = state.items.filter(l => l._id !== action.payload);
      });
  },
});

export const { clearSelected } = leagueSlice.actions;
export default leagueSlice.reducer;
