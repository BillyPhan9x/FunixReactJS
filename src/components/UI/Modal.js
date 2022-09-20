import React from "react";
import ReactDOM from "react-dom";

import styles from "./Modal.module.css";
//  Adding a Modal via a React Portal
const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onHideCart} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

const portalEl = document.getElementById("modal");

const Modal = (props) => {
  return (
    <React.Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        portalEl
      )}
      ;
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalEl
      )}
    </React.Fragment>
  );
};

export default Modal;

// cần sử dụng React Protal để điều chỉnh vị trí của Modal ra hẳn bên ngoài Container App.

// Thêm 1 div có id modal là anh em(cùng cấp) với div có id root
