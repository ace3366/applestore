import { createSlice } from "@reduxjs/toolkit";
// Tuỳ chọn boolean để set cho cả Obj
function setBool(obj, bool) {
  Object.keys(obj).forEach((key) => (obj[key] = bool));
}

const initialState = {
  category: {
    iphone: true,
    ipad: true,
    watch: true,
    airpod: true,
    macbook: true,
    mouse: true,
    keyboard: true,
    other: true,
  },
};

const categorySlicer = createSlice({
  name: "category",
  initialState,
  reducers: {
    CHOOSE_CATE(state, action) {
      if (action.payload === "all") {
        setBool(state.category, true);
      } else {
        setBool(state.category, false);
        state.category[`${action.payload}`] = true;
      }
    },
  },
});

export default categorySlicer.reducer;
export const categoryAction = categorySlicer.actions;
