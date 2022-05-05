import React from "react";
import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { IngredientDetails } from "../ingredient-details/ingredient-details";

export function Modal() {
  return (
    <div className={modalStyles.modal}>
      <div className={modalStyles.title}>
        <h2 className="text text_type_main-large ml-10">Детали ингредиента</h2>
      </div>
      <div className={modalStyles.close}>
        <CloseIcon type="primary" />
      </div>
      <IngredientDetails />
    </div>
  );
}
