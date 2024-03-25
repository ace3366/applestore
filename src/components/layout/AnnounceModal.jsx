import classes from "./AnnounceModal.module.css";
import { createPortal } from "react-dom";
import Announce from "../DetailPage/Announce";

// Kiểm tra xe có div chứa modal chưa, tạo 1 cái nếu chưa có
let modalRoot = document.getElementById("modal-root");

if (!modalRoot) {
  const newModal = document.createElement("div");
  newModal.id = "modal-root";
  document.body.appendChild(newModal);
  modalRoot = newModal;
}

export default function Modal() {
  return createPortal(
    <div className={classes.modal}>
      <div className={classes["modal-backdrop"]}></div>
      <div className={classes["modal-content"]}>
        {/* Thông tin hiển thị chính */}
        <Announce></Announce>
      </div>
    </div>,
    modalRoot
  );
}
