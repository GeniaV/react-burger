import React from "react";
import modalOverlayStyles from "./modal-overlay.module.css";

export function ModalOverlay({ onClick }) {
  return (
    <div className={modalOverlayStyles.overlay} onClick={onClick}>
    </div>
  );
}


