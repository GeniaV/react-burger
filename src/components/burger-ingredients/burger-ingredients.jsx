import React from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { type } from "../../utils/types";
import PropTypes from "prop-types";

function Tabs() {
  const [current, setCurrent] = React.useState("Булки");
  return (
    <div className={burgerIngredientsStyles.tabs}>
      <a href="#bun" className={burgerIngredientsStyles.tab}>
        <Tab
          value="Булки"
          active={current === "Булки"}
          onClick={setCurrent}
          href="#bun"
        >
          Булки
        </Tab>
      </a>
      <a href="#souses" className={burgerIngredientsStyles.tab}>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
      </a>
      <a href="#main" className={burgerIngredientsStyles.tab}>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </a>
    </div>
  );
}

export function BurgerIngredients(props) {
  return (
    <section className="pl-8">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Tabs />
      <section className={`mt-10 ${burgerIngredientsStyles.section}`}>
        <h2 className="text text_type_main-medium" id="bun">
          Булки
        </h2>
        <ProductList category={props.ingredients.filter((data) => data.type === "bun")} onClick={props.onClick}/>
        <h2 className="text text_type_main-medium" id="souses">
          Cоусы
        </h2>
        <ProductList category={props.ingredients.filter((data) => data.type === "sauce")} onClick={props.onClick}/>
        <h2 className="text text_type_main-medium" id="main">
          Начинки
        </h2>
        <ProductList category={props.ingredients.filter((data) => data.type === "main")} onClick={props.onClick}/>
      </section>
    </section>
  );
}

function ProductList(props) {
  return (
    <section
      className={`pt-6 pl-4 pr-4 mb-10 ${burgerIngredientsStyles.items}`}
    >
      {props.category.map((card) => (
        <article className={burgerIngredientsStyles.card} key={card._id}  onClick={() => props.onClick(card)}>
          <Counter
            count={1}
            size="default"
            className={burgerIngredientsStyles.counter}
          />
          <img
            className={`ml-4 mr-4 ${burgerIngredientsStyles.image}`}
            src={card.image}
            alt={card.name}
          />
          <div className={burgerIngredientsStyles.price}>
            <p className="text text_type_digits-default mt-1 mb-1">
              {card.price}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <div className={burgerIngredientsStyles.name}>
            <p className="text text_type_main-default">{card.name}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

// Проверка данных
ProductList.propTypes = {
  category: PropTypes.arrayOf(type)
}

BurgerIngredients.propTypes = {
  onClick: PropTypes.func
};

ProductList.propTypes = {
  onClick: PropTypes.func
};

