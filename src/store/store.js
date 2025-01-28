import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "./slices/favoriteSlice";
import cartReducer from "./slices/cartSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    favorites: favoriteReducer || [],
    cart: cartReducer || [],
    auth: authSlice || {},
  },
});

export default store;
