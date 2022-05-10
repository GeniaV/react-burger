import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { type } from "../../utils/types";
import PropTypes from "prop-types";

export function IngredientDetails(props) {
  return (
    <section className={ingredientDetailsStyles.container}>
      <div className={`pl-5 pr-5 ${ingredientDetailsStyles.photo}`}>
        <img src={props.ingredientdata.image_large} alt={props.ingredientdata.name} />
      </div>
      <h3
        className={`text text_type_main-medium pb-8 mt-4 ${ingredientDetailsStyles.name}`}
      >
        {props.ingredientdata.name}
      </h3>
      <ul className={`mb-15 ${ingredientDetailsStyles.contains}`}>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Калории,ккал
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredientdata.calories}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Белки, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredientdata.proteins}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Жиры, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredientdata.fat}
          </p>
        </li>
        <li>
          <p className="text text_type_main-default text_color_inactive pb-2">
            Углеводы, г
          </p>
          <p className="text text_type_digits-default text_color_inactive">
            {props.ingredientdata.carbohydrates}
          </p>
        </li>
      </ul>
    </section>
  );
}

IngredientDetails.propTypes = {
  ingredientdata: type
}
