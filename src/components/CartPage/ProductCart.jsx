import { useRouteLoaderData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { cartActions } from "../../store/listCart.js";
import { getData, setData } from "../../util/localStorage.js";
import priceConverter from "../../util/priceConverter.js";
export default function ProductCart({ id, quantity }) {
  // Lọc lấy product cần thiết
  const allProduct = useRouteLoaderData("product-sample");
  const displayProduct = allProduct.find((product) => product._id.$oid === id);

  // Khai báo redux
  const productData = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  //Lấy data cần trong cart để hiển thị
  const prod = productData.find((product) => product.id === id);
  return (
    <>
      {prod && (
        <tr className="text-center">
          <td className="py-5 px-2 w-2/12">
            <img src={displayProduct.img1} className="" alt="" />
          </td>
          <td className="px-2 w-3/12 font-medium">{displayProduct.name}</td>
          <td className="px-2 w-2/12 text-sm text-neutral-400">
            {priceConverter(displayProduct.price)}
          </td>
          <td className="px-2 w-2/12">
            <i
              className="fa-solid fa-caret-left w-5 text-center my-auto cursor-pointer"
              onClick={() => {
                dispatch(
                  cartActions.UPDATE_CART({
                    id,
                    quantity: 1,
                    price: displayProduct.price,
                  })
                );
              }}
            ></i>
            <span className="not-italic">{prod.quantity}</span>{" "}
            <i
              className="fa-solid fa-caret-right w-5 text-center my-auto cursor-pointer"
              onClick={() => {
                dispatch(
                  cartActions.ADD_CART({
                    id,
                    quantity: 1,
                    price: displayProduct.price,
                  })
                );
              }}
            ></i>
          </td>
          <td className="px-2 w-2/12 text-sm text-neutral-400">
            {priceConverter(displayProduct.price * prod.quantity)}
          </td>
          <td className="px-2 w-1/12 text-neutral-600">
            <i
              className="fa-regular fa-trash-can cursor-pointer hover:text-rose-600"
              onClick={() => {
                dispatch(cartActions.DELETE_CART({ id }));
              }}
            ></i>
          </td>
        </tr>
      )}
    </>
  );
}
