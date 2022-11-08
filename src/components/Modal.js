import { createPortal } from "react-dom";

import classes from "./Modal.module.css";

const Modal = ({ children, onClose }) => {
  const modal = document.getElementById("modal");

  return createPortal(
    <div className={classes.backdrop} onClick={onClose}>
      <dialog
        className={classes.modal}
        open
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </dialog>
    </div>,
    modal
  );
};

export default Modal;
