import { Form, useRouteLoaderData } from "react-router-dom";

import { useSelector } from "react-redux";
import Banner from "../components/CheckoutPage/Banner";
import { getData } from "../util/localStorage.js";
import priceConverter from "../util/priceConverter.js";

export default function CheckoutPage() {
  // Lấy dữ liệu về tất cả product và product trong cart
  const cart = useSelector((state) => state.cart.products);
  const total = useSelector((state) => state.cart.totalPrice);
  const styles = {
    label: "italic text-lg text-neutral-500 my-3",
    input:
      "pl-4 border-neutral-300 border-2 hover:border-neutral-400 w-full h-10",
  };

  return (
    <div className="max-w-4xl mx-auto mt-12 mb-16">
      <Banner></Banner>
      <h3 className="text-2xl mb-5 my-12 font italic">BILLING DETAILS</h3>
      <div className="flex gap-4">
        {/* Phần form */}
        <Form method="post" className="basis-2/3">
          <div className={styles.label} htmlFor="">
            FULL NAME :
          </div>
          <input
            className={styles.input}
            name="name"
            type="text"
            placeholder="Enter Your Full Name Here!"
          />
          <div className={styles.label} htmlFor="">
            EMAIL :
          </div>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Enter Your Email Here!"
          />
          <div className={styles.label} htmlFor="">
            PHONE NUMBER :
          </div>
          <input
            className={styles.input}
            name="phone"
            type="text"
            placeholder="Enter Your Phone Number Here!"
          />
          <div className={styles.label} htmlFor="">
            ADDRESS :
          </div>
          <input
            className={styles.input}
            name="address"
            type="text"
            placeholder="Enter Your Addess Here!"
          />

          <button className="block py-2 px-6 text-lg mt-5 text-neutral-400 hover:text-neutral-300 italic">
            Place order
          </button>
        </Form>

        {/* Phần total */}
        <div className="basis-1/3">
          <div className=" bg-neutral-100 px-7 ">
            <div className="italic py-12">
              <h2 className="text-xl mb-7">YOUR ORDER</h2>
              {cart.map((product) => (
                <div className="py-3 border-b-2 tracking-tight">
                  <div>{product.name}</div>
                  <div className="text-neutral-400">
                    {" "}
                    {priceConverter(product.price)} x {product.quantity}{" "}
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-6 text-lg">
                <div className="font-medium">TOTAL</div>
                <div className="text-neutral-700">{priceConverter(total)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function action({ request, params }) {
  const customerInfo = await request.formData();
  const cart = getData("cart");
  const billData = {
    cart,
    customerInfo,
  };
  return null;
}
