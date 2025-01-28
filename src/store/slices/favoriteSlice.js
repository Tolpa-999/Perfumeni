import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      const itemExists = state.find((item) => item._id === action.payload._id);
      if (!itemExists) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
