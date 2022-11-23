import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    value: "",
  },
  reducers: {
    storeUser: (state, action) => {
      state.value = action.payload;
    },
    resetState: (state) => {
      state.value = userSliceInitialState.value;
    },
  },
});

export const { storeUser } = userSlice.actions;

export const { resetState } = userSlice.actions;

export const userSliceInitialState = userSlice.getInitialState();

export default userSlice.reducer;
