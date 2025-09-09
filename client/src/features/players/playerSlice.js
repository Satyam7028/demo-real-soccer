import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/players";

// Fetch all players
export const fetchPlayers = createAsyncThunk("players/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Fetch single player
export const fetchPlayer = createAsyncThunk("players/fetchOne", async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
});

// Create player
export const createPlayer = createAsyncThunk("players/create", async (playerData, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.post(API_URL, playerData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Update player
export const updatePlayer = createAsyncThunk("players/update", async ({ id, playerData }, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.put(`${API_URL}/${id}`, playerData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Delete player
export const deletePlayer = createAsyncThunk("players/delete", async (id, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const playerSlice = createSlice({
  name: "players",
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
      .addCase(fetchPlayers.pending, (state) => { state.loading = true; })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchPlayer.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        const index = state.items.findIndex(p => p._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.items = state.items.filter(p => p._id !== action.payload);
      });
  },
});

export const { clearSelected } = playerSlice.actions;
export default playerSlice.reducer;
