import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./modal";
import validateReducer from "./validate";
import loginReducer from "./login";
import cartReducer from "./listCart";
import messModalReducer from "./messengerModal";

const store = configureStore({
  reducer: {
    modal: modalReducer,
    validate: validateReducer,
    login: loginReducer,
    cart: cartReducer,
    messenger: messModalReducer,
  },
});

export default store;
