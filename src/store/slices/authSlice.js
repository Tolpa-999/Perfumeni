import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {}, // User data (e.g., name, email, roles)
  accessToken: "", // Auth token for API calls
  isAuthenticated: false, // Login status
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {};
      state.accessToken = "";
      state.isAuthenticated = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export const { login, logout, updateUser } = authSlice.actions;

export default authSlice.reducer;
