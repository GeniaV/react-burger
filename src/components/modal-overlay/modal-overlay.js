import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";
import { Modal } from "../modal/modal";

export function ModalOverlay() {
  return (
    <div className={modalOverlayStyles.overlay}>
      <Modal />
    </div>
  );
}


