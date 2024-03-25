import { Link } from "react-router-dom";
import { setData, getData } from "../util/localStorage.js";
import { useSelector } from "react-redux";
import priceConverter from "../util/priceConverter.js";
import Banner from "../components/CartPage/Banner";
import ProductCart from "../components/CartPage/ProductCart";

export default function CartPage() {
  const coupon = 1;
  const total = useSelector((state) => state.cart.totalPrice);
  const styles = {
    td: "font-medium text-neutral-600 py-4 px-3",
  };
  const cartProducts = getData("cart") || [];
  return (
    <div className="max-w-4xl mx-auto mt-10 mb-12">
      <Banner></Banner>
      <h3 className="text-2xl mb-5 my-12 italic">CATEGORIES</h3>
      {/* Phần thông tin cart */}
      <div className="flex justify-between gap-8">
        {" "}
        {/* Phần products */}
        <div className="italic basis-2/3">
          {/* List sản phẩm trong Card */}
          <table className=" w-full mb-12">
            {/* Phần tiêu đề hiển thị */}
            <tr className="bg-neutral-100">
              <th className={styles.td}>IMAGE</th>
              <th className={styles.td}>PRODUCT</th>
              <th className={styles.td}>PRICE</th>
              <th className={styles.td}>QUANTITY</th>
              <th className={styles.td}>TOTAL</th>
              <th className={styles.td}>REMOVE</th>
            </tr>
            {/* Phần sản phẩm */}
            {cartProducts.map((product) => (
              <ProductCart
                key={product.id}
                id={product.id}
                quantity={product.quantity}
              ></ProductCart>
            ))}
          </table>

          {/* In 1 câu thông báo nếu giỏ hàng đang trống */}
          {cartProducts.length === 0 && (
            <p className="text-center mb-12 italic text-lg text-neutral-500">
              Giỏ hàng hiện đang trống
            </p>
          )}
          {/* Thanh navigate */}
          <div className="w-full bg-neutral-100">
            <div className="flex justify-between py-5 px-6">
              <Link
                to="/shop"
                className="hover:text-[#c07f00] font-light text-lg py-1 cursor-pointer"
              >
                <i className="fa-solid fa-left-long mr-2"></i>Continue shopping
              </Link>
              <Link
                to="/checkout"
                className="hover:text-[#c07f00] hover:border-[#c07f00] font-light text-lg py-1 px-3 cursor-pointer border-2 border-neutral-900 "
              >
                Proceed to checkout
                <i className="fa-solid fa-right-long ml-2"></i>
              </Link>
            </div>
          </div>
        </div>
        {/* Phần total */}
        <div className="basis-1/3 italic">
          <div className="py-16 px-8 bg-neutral-100">
            <h2 className="text-xl my-5 font-medium">CART TOTAL</h2>
            <div className="flex justify-between pb-3 border-b-2">
              <div>SUBTOTAL</div>
              <div className="text-neutral-500" className="text-neutral-400">
                {priceConverter(total)}
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <div>TOTAL</div>
              <div>{priceConverter(total * coupon)}</div>
            </div>
            <div className="mt-7">
              <input
                className="h-10 w-full pl-3 hover:border-2"
                type="text"
                placeholder="Enter your coupon"
              />
              <button className="w-full text-neutral-200 py-2 hover:bg-neutral-600">
                <i className="fa-solid fa-gift"></i> Apply coupon
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
