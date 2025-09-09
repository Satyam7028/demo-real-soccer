import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productReducer from '../features/products/productSlice';
import cartReducer from '../features/cart/cartSlice';
import playerReducer from '../features/players/playerSlice';
import leagueReducer from '../features/leagues/leagueSlice';
import fixtureReducer from '../features/fixtures/fixtureSlice';
import newsReducer from '../features/news/newsSlice';
import orderReducer from '../features/orders/orderSlice';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    players: playerReducer,
    leagues: leagueReducer,
    fixtures: fixtureReducer,
    news: newsReducer,
    orders: orderReducer,
    users: userReducer,
  },
});
