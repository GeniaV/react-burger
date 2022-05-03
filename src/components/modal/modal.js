import React from "react";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientDetails } from "../ingredient-details/ingredient-details"
import { OrderDetails } from "../order-details/order-details"

export function Modal() {
  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.close}>
        <CloseIcon type="primary" />
      </div>
      <OrderDetails />
    </div>
  );
}

