import { createSlice } from "@reduxjs/toolkit";
const initialState = { isLogin: false, user: null };
const loginSlicer = createSlice({
  name: "login",
  initialState,
  reducers: {
    ON_LOGIN(state, action) {
      state.isLogin = true;
      state.user = action.payload;
    },
    ON_LOGOUT(state) {
      state.isLogin = false;
      state.user = null;
    },
  },
});

export default loginSlicer.reducer;
export const loginActions = loginSlicer.actions;
