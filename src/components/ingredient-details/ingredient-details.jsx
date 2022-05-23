import React from "react";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { type } from "../../utils/types";
import PropTypes from "prop-types";

export function IngredientDetails({ ingredientData }) {
  return (
    <section className={ingredientDetailsStyles.container}>
      <div className={`pl-5 pr-5 ${ingredientDetailsStyles.photo}`}>
        <img src={ingredientData.image_large} alt={ingredientData.name} />
      </div>
      <h3
        className={`text text_type_main-medium pb-8 mt-4 ${ingredientDetailsStyles.name}`}
      >
        {ingredientData.name}
      </h3>
      <ul className={`mb-15 ${ingredientDetailsStyles.contains}`}>
        <Ingredient ingredientInfo={ingredientData.calories} text="Калории,ккал" />
        <Ingredient ingredientInfo={ingredientData.proteins} text="Белки, г" />
        <Ingredient ingredientInfo={ingredientData.fat} text="Жиры, г" />
        <Ingredient ingredientInfo={ingredientData.carbohydrates} text="Углеводы, г" />
      </ul>
    </section>
  );
}

function Ingredient({ ingredientInfo, text}) {
  return (
    <li>
    <p className="text text_type_main-default text_color_inactive pb-2">
      {text}
    </p>
    <p className="text text_type_digits-default text_color_inactive">
      {ingredientInfo}
    </p>
  </li>
  )
}

IngredientDetails.propTypes = {
  ingredientData: type
}

Ingredient.propTypes = {
  ingredientInfo: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired
}
