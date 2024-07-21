import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  file: null,
  activePostTab: 0
};

export const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    setPostFile: (state, action) => {
      state.file = action.payload;
    },
    setActivePostTab: (state, action) => {
      state.activePostTab = action.payload;
    },
  },
});

export const { setPostFile, setActivePostTab } = postSlice.actions;
export default postSlice.reducer;
