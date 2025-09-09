import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "/api/news";

// Fetch all news
export const fetchNews = createAsyncThunk("news/fetchAll", async () => {
  const res = await axios.get(API_URL);
  return res.data;
});

// Fetch single news article
export const fetchNewsArticle = createAsyncThunk("news/fetchOne", async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
});

// Create news article
export const createNewsArticle = createAsyncThunk("news/create", async (newsData, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.post(API_URL, newsData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Update news article
export const updateNewsArticle = createAsyncThunk("news/update", async ({ id, newsData }, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  const res = await axios.put(`${API_URL}/${id}`, newsData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
});

// Delete news article
export const deleteNewsArticle = createAsyncThunk("news/delete", async (id, { getState }) => {
  const state = getState();
  const token = state.auth.user.token;
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return id;
});

const newsSlice = createSlice({
  name: "news",
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
      .addCase(fetchNews.pending, (state) => { state.loading = true; })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchNewsArticle.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(createNewsArticle.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateNewsArticle.fulfilled, (state, action) => {
        const index = state.items.findIndex(n => n._id === action.payload._id);
        if (index !== -1) state.items[index] = action.payload;
      })
      .addCase(deleteNewsArticle.fulfilled, (state, action) => {
        state.items = state.items.filter(n => n._id !== action.payload);
      });
  },
});

export const { clearSelected } = newsSlice.actions;
export default newsSlice.reducer;
