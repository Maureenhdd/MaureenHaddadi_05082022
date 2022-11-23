import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: "",
  },

  reducers: {
    storeToken: (state, action) => {
      state.value = action.payload;
    },
    resetStateToken: (state) => {
      state.value = tokenSliceInitialState.value;
    },
  },
});

export const { storeToken } = tokenSlice.actions;
export const { resetStateToken } = tokenSlice.actions;

export const tokenSliceInitialState = tokenSlice.getInitialState();

export default tokenSlice.reducer;
