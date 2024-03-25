import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./components/layout/Layout";
import HomePage, { loader as productLoader } from "./page/HomePage";
import CartPage from "./page/CartPage";
import CheckoutPage, { action as checkoutAction } from "./page/CheckoutPage";
import DetailPage from "./page/DetailPage";
import LoginPage, { action as signInAction } from "./page/LoginPage";
import RegisterPage, { action as signUpAction } from "./page/RegisterPage";
import ShopPage from "./page/ShopPage";
import Information from "./page/Information";

import logo from "./logo.svg";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/applestore",
    element: <Layout></Layout>,
    loader: productLoader,
    id: "product-sample",
    children: [
      { index: true, element: <HomePage></HomePage> },
      { path: "shop", element: <ShopPage></ShopPage> },
      {
        path: "detail/:productId",
        element: <DetailPage></DetailPage>,
      },
      { path: "cart", element: <CartPage></CartPage> },
      {
        path: "checkout",
        element: <CheckoutPage></CheckoutPage>,
        action: checkoutAction,
      },
      { path: "login", element: <LoginPage></LoginPage>, action: signInAction },
      {
        path: "register",
        element: <RegisterPage></RegisterPage>,
        action: signUpAction,
      },
      { path: "information", element: <Information></Information> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
