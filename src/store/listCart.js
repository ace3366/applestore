import { createSlice } from "@reduxjs/toolkit";
import { setData, getData } from "../util/localStorage";
const data = getData("cart") || [];
const initialState = {
  products: data || [],
  totalPrice: data.reduce(
    (total, product) => total + product.quantity * product.price,
    0
  ),
};
const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_CART(state, action) {
      // Tìm index product
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      // Nếu không kiếm được index thì thêm product vào arr
      if (index === -1) {
        state.products.push(action.payload);
        state.totalPrice += action.payload.quantity * action.payload.price;
      } else {
        state.products[index].quantity += action.payload.quantity;
        state.totalPrice += action.payload.quantity * action.payload.price;
      }
      setData("cart", state.products);
    },
    UPDATE_CART(state, action) {
      // Tìm index product
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      // Nếu quantity bằng 0 thì k cần giảm nữa
      if (state.products[index].quantity > 0) {
        state.products[index].quantity -= action.payload.quantity;
        state.totalPrice -= action.payload.quantity * action.payload.price;
        setData("cart", state.products);
      }
    },
    DELETE_CART(state, action) {
      // Tìm index product
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      state.totalPrice -=
        state.products[index].quantity * state.products[index].price;
      // Xoá khỏi cart
      state.products.splice(index, 1);
      setData("cart", state.products);
    },
  },
});
export default cartSlicer.reducer;
export const cartActions = cartSlicer.actions;
