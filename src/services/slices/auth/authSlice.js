import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
    },

  },
});

export const { setAuth, logout } = authSlice.actions;
export default authSlice.reducer;
