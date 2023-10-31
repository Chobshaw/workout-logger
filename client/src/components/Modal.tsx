import { ReactNode } from "react";
import ReactDom from "react-dom";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className="overlay" />
      <div className="modal">
        <button
          className="material-symbols-outlined close"
          type="button"
          onClick={onClose}
        >
          close
        </button>
        {children}
      </div>
    </>,
    document.getElementById("portal")!
  );
}
