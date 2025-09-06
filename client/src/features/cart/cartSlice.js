import { createSlice } from "@reduxjs/toolkit";

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: cartItems,
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find((i) => i._id === item._id);

      if (existing) {
        existing.qty += item.qty;
      } else {
        state.items.push(item);
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i._id === id);
      if (item) item.qty = qty;
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateQty, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
