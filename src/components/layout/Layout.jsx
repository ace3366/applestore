import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { messModalActions } from "../../store/messengerModal.js";
import NavBar from "./NavBar";
import Footer from "./Footer";
import MessengerModal from "./MessengerModal";

export default function Layout() {
  const modal = useSelector((state) => state.messenger.openModal);
  const dispatch = useDispatch();
  return (
    <div>
      <NavBar></NavBar>
      <i
        onClick={() => {
          dispatch(messModalActions.TOGGLE_POPUP());
        }}
        className="fa-brands fa-facebook-messenger text-5xl fixed right-10 bottom-20 z-20 cursor-pointer"
      ></i>
      <Outlet></Outlet>
      <Footer></Footer>
      {modal && <MessengerModal></MessengerModal>}
    </div>
  );
}
