import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { data } from "../../utils/data";

export function IngredientDetails() {
  return (
    <section className={ingredientDetailsStyles.container}>
      <div className={`pl-5 pr-5 ${ingredientDetailsStyles.photo}`}>
        <img src={data[0].image_large} alt={data[0].name} />
      </div>
      <h3
        className={`text text_type_main-medium pb-8 mt-4 ${ingredientDetailsStyles.name}`}
      >
        {data[0].name}
      </h3>
      <ul className={`mb-15 ${ingredientDetailsStyles.contains}`}>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data[0].calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data[0].proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data[0].fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {data[0].carbohydrates}
          </p>
        </li>
      </ul>
    </section>
  );
}
