import { useRef } from "react";
import { Link, Form, redirect, useActionData } from "react-router-dom";
import classes from "./LoginPage.module.css";
import { useSelector, useDispatch } from "react-redux";
import { validateAction } from "../store/validate.js";
import { setData, getData } from "../util/localStorage.js";

export default function LoginPage() {
  // const userArr = getData("user") || [];
  // console.log(userArr);

  //Phần Redux
  const dispatch = useDispatch();
  const emailLogInVal = useSelector((state) => state.validate.emailLogIn);
  const passwordLogInVal = useSelector((state) => state.validate.passwordLogIn);

  // Phần useRef
  const emailLogIn = useRef();
  const passwordLogIn = useRef();

  // Lấy data trả về từ action để check valid
  // Nếu có lỗi email hay mật khẩu thì return showAnnouce property là true
  // Nếu validate thành công thì lấy object user
  const showAnnounce = useActionData();

  if (showAnnounce === true) {
    passwordLogIn.current.value = "";
  }

  return (
    <>
      <div className={classes.login}>
        <div className="py-14">
          {" "}
          <section
            className={` bg-white border max-w-xl mx-auto py-16 flex flex-col items-center rounded-2xl shadow-lg`}
          >
            <h2 className=" text-3xl italic mb-20  text-neutral-500">
              Sign In{" "}
            </h2>

            {/* Hiển thị báo lỗi validate */}
            <div className="mb-6 pl-16 italic w-full text-rose-400">
              <p>{emailLogInVal}</p>
              <p>{passwordLogInVal}</p>
              {showAnnounce && (
                <p>Email hoặc mật khẩu không khả dụng, hãy thử lại</p>
              )}
            </div>

            {/* Phần form */}
            <Form action="" method="post" className="flex flex-col w-4/5">
              <input
                type="email"
                ref={emailLogIn}
                name="emailLogIn"
                className={`${
                  emailLogInVal && classes.alert
                } border-2 hover:border-neutral-400 h-16 pl-7 `}
                placeholder="Email"
                onBlur={() => {
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "emailLogIn",
                      value: emailLogIn.current.value,
                    })
                  );
                }}
              />
              <input
                type="password"
                ref={passwordLogIn}
                name="passwordLogIn"
                className={`${
                  passwordLogInVal && classes.alert
                } border-x-2 border-b-2 hover:border-neutral-400 hover:border-2 h-16 pl-7`}
                placeholder="Password"
                onBlur={() => {
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "passwordLogIn",
                      value: passwordLogIn.current.value,
                    })
                  );
                }}
              />

              <button
                onClick={() => {
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "emailLogIn",
                      value: emailLogIn.current.value,
                    })
                  );
                  dispatch(
                    validateAction.CHECK_VALIDATE({
                      type: "passwordLogIn",
                      value: passwordLogIn.current.value,
                    })
                  );
                }}
                className="w-full py-5 text-neutral-200 mt-6"
              >
                SIGN IN
              </button>
            </Form>

            {/* Phần toggle signup/in */}
            <div className="mt-10 italic text-lg">
              <span className="text-neutral-500">Create an account?</span>

              <Link
                to="/applestore/register"
                className="cursor-pointer ml-2 text-sky-700"
              >
                Sign up
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
    email: data.get("emailLogIn"),
    password: data.get("passwordLogIn"),
  };
  //Dữ liệu trả về gồm 2 loại, show annouce và data user lấy được
  // Khi chưa nhập thì chưa cần validate
  if (userData.email === "" || userData.password === "") {
    return false;
  }
  // Kiểm tra xem có trùng email trong storage không
  // Sau đó kiểm tra tới password
  // Nếu có thì xem như login thành công, lưu dữ liệu người dùng
  const loginUser = userArr.find((user) => user.email === userData.email);
  if (loginUser) {
    if (loginUser.password === userData.password) {
      setData("currentUser", loginUser);
      return redirect("/applestore");
    } else {
      return true;
    }
  } else {
    return true;
  }
}
