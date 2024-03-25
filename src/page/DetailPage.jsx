import { useParams, useRouteLoaderData, Form } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/listCart.js";
import { modalActions } from "../store/modal.js";
import priceConverter from "../util/priceConverter.js";
import classes from "./DetailPage.module.css";
import Product from "../components/ShopPage/Product";
import { getData, setData } from "../util/localStorage.js";
import AnnounceModal from "../components/layout/AnnounceModal";

// localStorage.clear();
export default function DetailPage() {
  const cart = getData("cart") || [];
  // Khai báo redux
  const selector = useSelector((state) => state.cart.products);
  const modal = useSelector((state) => state.modal.openModal);
  const dispatch = useDispatch();

  const param = useParams();
  // Đọc dữ liệu load từ loader
  const data = useRouteLoaderData("product-sample");
  // Lấy product hiện tại
  const productData =
    data && data.filter((product) => product._id.$oid === param.productId);

  // Lấy related product
  const relatedProduct =
    data &&
    data.filter(
      (product) =>
        product.category === productData[0].category &&
        product._id.$oid !== productData[0]._id.$oid
    );

  const [image, setImage] = useState(productData[0].img1);
  const [quantity, setQuantity] = useState(1);
  const showQuantity = useRef();

  // Nếu có thay đổi khi click sản phẩm thì set State để re-render lại hình
  // Cũng như set quantity về 1
  useEffect(() => {
    setImage(productData[0].img1);
    setQuantity(1);
  }, [param]);

  // Hàm xử lý input quantity
  function changeValue(e) {
    setQuantity(parseInt(e.target.value));
  }

  // Hàm xử lý add to cart, thêm vào giỏ hàng cũng như mở modal thông báo
  function addToCart() {
    dispatch(
      modalActions.SHOW_POPUP({
        name: productData[0].name,
        img: productData[0].img1,
        quantity,
        price: productData[0].price,
      })
    );
    dispatch(
      cartActions.ADD_CART({
        id: param.productId,
        quantity,
        name: productData[0].name,
        price: parseInt(productData[0].price),
      })
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto my-32">
        {/* Phần thông tin chung */}
        <section className="flex justify-between gap-6">
          {/* Khu vực chọn hình */}
          <div className="basis-1/12">
            <img
              src={productData[0].img1}
              alt=""
              onClick={() => {
                setImage(productData[0].img1);
              }}
              className="cursor-pointer mb-2"
            />
            <img
              src={productData[0].img2}
              alt=""
              onClick={() => {
                setImage(productData[0].img2);
              }}
              className="cursor-pointer mb-2"
            />
            <img
              src={productData[0].img3}
              alt=""
              onClick={() => {
                setImage(productData[0].img3);
              }}
              className="cursor-pointer mb-2"
            />
            <img
              src={productData[0].img4}
              alt=""
              onClick={() => {
                setImage(productData[0].img4);
              }}
              className="cursor-pointer mb-2"
            />
          </div>
          {/* Khu vực show hình theo hình đã chọn */}
          <div className="basis-5/12">
            {" "}
            <img src={image} alt="" />
          </div>
          {/* Khu vực hiển thị thông tin và add to cart */}
          <div className="basis-6/12 italic">
            <h2 className="text-3xl">{productData[0].name}</h2>
            <div className="my-7 text-2xl text-neutral-500 font-light">
              {priceConverter(productData[0].price)}
            </div>
            <p className="text-neutral-400">{productData[0].short_desc}</p>
            <div className="mt-8 mb-5">
              <span>CATEGORY : </span>
              <span className="text-neutral-400">
                {productData[0].category}
              </span>
            </div>

            {/* Xử lý phần nhập số lượng, nếu số lượng < 1 thì không giảm số nữa */}
            <div className="flex">
              <div className="border-2 border-solid border-neutral-300 flex">
                {" "}
                <div className="w-40 my-auto pl-3 text-neutral-400">
                  QUANTITY
                </div>
                <i
                  className="fa-solid fa-caret-left w-5 text-center my-auto cursor-pointer"
                  onClick={() => {
                    parseInt(showQuantity.current.value) > 1 &&
                      setQuantity(parseInt(showQuantity.current.value) - 1);
                  }}
                ></i>
                <input
                  ref={showQuantity}
                  name="quantity"
                  value={quantity}
                  onChange={changeValue}
                  type="number"
                  className="w-7 text-center"
                />
                <i
                  className="fa-solid fa-caret-right w-5 text-center my-auto cursor-pointer"
                  onClick={() => {
                    setQuantity(parseInt(showQuantity.current.value) + 1);
                  }}
                ></i>
              </div>

              <button
                onClick={addToCart}
                className=" text-neutral-300 italic font-thin py-2 px-4"
              >
                Add to cart
              </button>
            </div>
          </div>
        </section>

        {/* Phần mô tả */}
        <section>
          <button className=" text-neutral-300 py-3 px-5 italic">
            DESCRIPTION
          </button>
          <h2 className="my-8 text-2xl italic">PRODUCT DESCRIPTION</h2>
          <p className="whitespace-pre-line italic text-neutral-400">
            {productData[0].long_desc}
          </p>
        </section>

        {/* Phần related product */}
        <section>
          <h2 className="my-8 text-2xl italic">RELATED PRODUCTS</h2>
          <div className="flex flex-wrap gap-4">
            {relatedProduct.map((product) => (
              <Product
                key={product._id.$oid}
                id={product._id.$oid}
                name={product.name}
                img={product.img1}
                price={product.price}
              ></Product>
            ))}
          </div>
        </section>
      </div>

      {/* Phần show modal thông báo khi add to cart */}
      {modal && <AnnounceModal></AnnounceModal>}
    </>
  );
}

// export async function action({ request, params }) {
//   const data = await request.formData();
//   // Chia data làm số lượng product và id product
//   const cart = {
//     quantity: parseInt(data.get("quantity")),
//     id: params.productId,
//   };
//   const cartArr = getData("cart") || [];
//   // Tìm index product
//   console.log(cartArr);
//   const index = cartArr.findIndex((product) => product.id === cart.id);
//   // Nếu không kiếm được index thì thêm product vào arr
//   if (index === -1) {
//     cartArr.push(cart);
//   } else {
//     cartArr[index].quantity += cart.quantity;
//   }
//   setData("cart", cartArr);
//   return null;
// }
