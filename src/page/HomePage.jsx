import { json } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Banner from "../components/HomePage/Banner";
import Category from "../components/HomePage/Category";
import Products from "../components/HomePage/Products";
import SubInfo from "../components/HomePage/SubInfo";
import { loginActions } from "../store/login.js";
import { getData } from "../util/localStorage.js";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loginActions.ON_LOGIN(getData("currentUser")));
  }, []);
  return (
    <div className="max-w-4xl mx-auto">
      <Banner></Banner>
      <Category></Category>
      <Products></Products>
      <SubInfo></SubInfo>
    </div>
  );
}

export async function loader() {
  const response = await fetch(
    "https://firebasestorage.googleapis.com/v0/b/funix-subtitle.appspot.com/o/Boutique_products.json?alt=media&token=dc67a5ea-e3e0-479e-9eaf-5e01bcd09c74"
  );
  if (!response.ok) {
    throw json({ messages: "Could not fetch product" }, { status: 500 });
  } else {
    return response;
  }
}
