import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userType: null,
  },
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload.userType;
    },
  },
});

export const { setUserType } = userSlice.actions;

export default userSlice.reducer;
