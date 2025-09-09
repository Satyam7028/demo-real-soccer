import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/fixtures";

// Fetch all fixtures
export const fetchFixtures = createAsyncThunk("fixtures/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Fetch single fixture
export const fetchFixture = createAsyncThunk("fixtures/fetchOne", async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
});

// Create fixture
export const createFixture = createAsyncThunk("fixtures/create", async (fixtureData, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.post(API_URL, fixtureData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Update fixture
export const updateFixture = createAsyncThunk("fixtures/update", async ({ id, fixtureData }, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.put(`${API_URL}/${id}`, fixtureData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Delete fixture
export const deleteFixture = createAsyncThunk("fixtures/delete", async (id, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const fixtureSlice = createSlice({
  name: "fixtures",
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
      .addCase(fetchFixtures.pending, (state) => { state.loading = true; })
      .addCase(fetchFixtures.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchFixtures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchFixture.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createFixture.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateFixture.fulfilled, (state, action) => {
        const index = state.items.findIndex(f => f._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteFixture.fulfilled, (state, action) => {
        state.items = state.items.filter(f => f._id !== action.payload);
      });
  },
});

export const { clearSelected } = fixtureSlice.actions;
export default fixtureSlice.reducer;
