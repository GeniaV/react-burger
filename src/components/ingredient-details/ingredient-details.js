import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { data } from "../../utils/data";

export function IngredientDetails() {
  return (
    <>
      <div className={ingredientDetailsStyles.title}>
        <h2 className="text text_type_main-large ml-10">Детали ингредиента</h2>
      </div>
      <section className={ingredientDetailsStyles.container}>
        <div className={`pl-5 pr-5 ${ingredientDetailsStyles.photo}`}>
          <img src={data[0].image_large} alt={data[0].name} />
        </div>
        <h3
          className={`text text_type_main-medium pb-8 mt-4 ${ingredientDetailsStyles.name}`}
        >
          Кристаллы марсианских альфа-сахаридов
        </h3>
        <ul className={`mb-15 ${ingredientDetailsStyles.contains}`}>
          <li>
            <p className="text text_type_main-default text_color_inactive pb-2">
              Калории,ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              244,4
            </p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive pb-2">
              Белки, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              12,2
            </p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive pb-2">
              Жиры, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              17,2
            </p>
          </li>
          <li>
            <p className="text text_type_main-default text_color_inactive pb-2">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              10,2
            </p>
          </li>
        </ul>
      </section>
    </>
  );
}
