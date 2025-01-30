import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";
import authSlice from "./slices/authSlice";

const preloadedState = {
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const store = configureStore({
  reducer: {
    favorites: favoriteReducer,
    cart: cartReducer,
    auth: authSlice || {},
  },
  preloadedState,
});

export default store;
