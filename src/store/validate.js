import { createSlice } from "@reduxjs/toolkit";

// Tạo 1 reducer quản lý thông báo nếu có input không hợp lệ
// Nếu không có lỗi thì giá trị là null
const initialState = {
  name: null,
  email: null,
  password: null,
  phone: null,
  emailLogIn: null,
  passwordLogIn: null,
};

const validateSlicer = createSlice({
  name: "validate",
  initialState,
  reducers: {
    CHECK_VALIDATE(state, action) {
      const users = JSON.parse(localStorage.getItem("user"));
      switch (action.payload.type) {
        // Kiểm tra name
        case "name":
          state.name =
            action.payload.value === "" ? "Tên không được bỏ trống" : null;
          break;
        // Kiểm tra email theo từng step
        case "email":
          state.email =
            (action.payload.value === "" && "Email không được bỏ trống") ||
            (!action.payload.value.includes("@") && "Email không hợp lệ") ||
            (users &&
              users.some((user) => user.email === action.payload.value) &&
              "Email này đã tồn tại") ||
            null;
          break;
        // Kiểm tra password
        case "password":
          state.password =
            (action.payload.value === "" && "Mật khẩu không được để trống") ||
            (action.payload.value.length < 8 && "Mật khẩu phải hơn 8 kí tự") ||
            null;
          break;
        // Kiểm tra phone
        case "phone":
          state.phone =
            action.payload.value === ""
              ? "Số điện thoại không được bỏ trống"
              : null;
          break;
        // Kiểm tra email log in
        case "emailLogIn":
          state.emailLogIn =
            (action.payload.value === "" && "Email không được bỏ trống") ||
            (!action.payload.value.includes("@") && "Email không hợp lệ") ||
            null;
          break;
        // Kiểm tra password log in
        case "passwordLogIn":
          state.passwordLogIn =
            action.payload.value === "" ? "Password không được bỏ trống" : null;
          break;
      }
    },
    RESET(state) {
      Object.keys(state).forEach((property) => (state[property] = null));
    },
  },
});

export default validateSlicer.reducer;
export const validateAction = validateSlicer.actions;
