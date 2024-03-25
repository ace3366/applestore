import { useRef } from "react";
import { Link, Form, redirect } from "react-router-dom";
import classes from "./LoginPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { validateAction } from "../store/validate.js";
import { setData, getData } from "../util/localStorage.js";

export default function RegisterPage() {
  // const userArr = getData("user") || [];
  // console.log(userArr);
  const dispatch = useDispatch();
  //Phần Redux
  const nameVal = useSelector((state) => state.validate.name);
  const emailVal = useSelector((state) => state.validate.email);
  const passwordVal = useSelector((state) => state.validate.password);
  const phoneVal = useSelector((state) => state.validate.phone);

  // Phần useRef
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();

  // Check tất cả input trước khi submit
  function checkAll() {
    dispatch(
      validateAction.CHECK_VALIDATE({
        type: "name",
        value: name.current.value,
      })
    );
    dispatch(
      validateAction.CHECK_VALIDATE({
        type: "email",
        value: email.current.value,
      })
    );
    dispatch(
      validateAction.CHECK_VALIDATE({
        type: "password",
        value: password.current.value,
      })
    );
    dispatch(
      validateAction.CHECK_VALIDATE({
        type: "phone",
        value: phone.current.value,
      })
    );
  }

  return (
    <>
      <div className={classes.login}>
        <div className="py-14">
          {" "}
          <section
            className={` bg-white border max-w-xl mx-auto py-16 flex flex-col items-center rounded-2xl shadow-lg`}
          >
            <h2 className=" text-3xl italic mb-10  text-neutral-500">
              Sign up
            </h2>

            {/* Hiển thị báo lỗi validate */}
            <div className="mb-6 pl-16 h-20 italic w-full text-rose-400">
              <p>{nameVal}</p>
              <p>{emailVal}</p>
              <p>{passwordVal}</p>
              <p>{phoneVal}</p>
            </div>

            {/* Phần form */}
            <Form action="" method="post" className="flex flex-col w-4/5">
              <input
                type="text"
                ref={name}
                name="name"
                className={`${
                  nameVal && classes.alert
                } border-2 hover:border-neutral-400 h-16 pl-7`}
                placeholder="Full Name"
                onBlur={() => {
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "name",
                      value: name.current.value,
                    })
                  );
                }}
              />
              <input
                type="email"
                ref={email}
                name="email"
                className={`${
                  emailVal && classes.alert
                } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7`}
                placeholder="Email"
                onBlur={() => {
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "email",
                      value: email.current.value,
                    })
                  );
                }}
              />
              <input
                type="password"
                ref={password}
                name="password"
                className={`${
                  passwordVal && classes.alert
                } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7`}
                placeholder="Password"
                onBlur={() => {
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "password",
                      value: password.current.value,
                    })
                  );
                }}
              />
              <input
                type="text"
                ref={phone}
                name="phone"
                className={`${
                  phoneVal && classes.alert
                } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7 `}
                placeholder="Phone"
                onBlur={() => {
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "phone",
                      value: phone.current.value,
                    })
                  );
                }}
              />

              {/* Một input ẩn gửi kèm theo form để xem đã hợp lệ chưa */}
              <input
                name="validate"
                type="hidden"
                value={!nameVal && !emailVal && !passwordVal && !phoneVal}
              />

              {/* Nút submit */}
              <button
                onClick={checkAll}
                className="w-full py-5 text-neutral-200 mt-6"
              >
                SIGN UP
              </button>
            </Form>

            {/* Phần toggle signup/in */}
            <div className="mt-10 italic text-lg">
              <span className="text-neutral-500">Login ?</span>
              <Link
                to="/applestore/login"
                className="cursor-pointer ml-2 text-sky-700"
              >
                Click
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

// Hàm action xử lý khi có form submit
export async function action({ request, params }) {
  const userArr = getData("user") || [];
  const data = await request.formData();
  const userData = {
    name: data.get("name"),
    email: data.get("email"),
    password: data.get("password"),
    phone: data.get("phone"),
  };
  const validate = data.get("validate");
  if (validate === "true") {
    userArr.push(userData);
    setData("user", userArr);
    return redirect("/applestore/login");
  } else {
    return null;
  }
}
