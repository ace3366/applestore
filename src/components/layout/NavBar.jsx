import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginActions } from "../../store/login.js";
import { setData } from "../../util/localStorage.js";
import classes from "./NavBar.module.css";

export default function NavBar() {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login.user);
  return (
    <div className="nav-bar flex justify-between py-4 italic text-lg max-w-4xl mx-auto">
      <div>
        <Link to="" className="mr-2 text-[#e6c16d]">
          Home
        </Link>
        <Link to="shop" className="mx-2 hover:text-[#C07F00]">
          Shop
        </Link>
      </div>
      <Link to="" className="text-2xl">
        {" "}
        BOUTIQUE
      </Link>
      <div>
        <Link to="cart" className={`${classes.choose} mr-3`}>
          <i className="fa-solid fa-cart-flatbed mr-1 "></i>
          Cart
        </Link>

        <Link
          to={loginData ? "information" : "login"}
          className={classes.choose}
        >
          <i className="fa-solid fa-user mr-1"></i>
          {loginData ? loginData.name : "Login"}
        </Link>
        <Link
          to="login"
          onClick={() => {
            dispatch(loginActions.ON_LOGOUT());
            setData("currentUser", null);
          }}
          className="ml-3 hover:text-[#C07F00]"
        >
          {loginData && "( Logout )"}
        </Link>
      </div>
    </div>
  );
}
