import React from "react";
import orderDetailsStyles from "./order-details.module.css";
import doneImage from "../../images/done.svg";

export function OrderDetails() {
  return (
    <>
      <h2
        className={`text_type_digits-large mt-30 mb-8 ${orderDetailsStyles.number}`}
      >
        034536
      </h2>
      <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
      <img src={doneImage} alt="done" />
      <p className="text text_type_main-default mt-15 mb-2">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
