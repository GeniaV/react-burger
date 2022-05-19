import React from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { type } from "../../utils/types";
import PropTypes from "prop-types";
import { IngredirntsContext } from "../../services/ingredientsContext";

export function BurgerConstructor({ onClick }) {
  const ingredients = React.useContext(IngredirntsContext);

  return (
    <section className="mt-25 ml-4 mr-8">
      <div className="mb-10">
        <TopProduct category={ingredients.filter((data) => data.type === "bun").slice(0, 1)} />
        <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
          <ProductList
            category={ingredients.filter((data) => data.type === "sauce" || data.type === "main")} />
        </section>
        <BottompProduct category={ingredients.filter((data) => data.type === "bun").slice(0, 1)} />
      </div>
      <MakeAnOrder onClick={onClick} />
    </section>
  );
}

function TopProduct({ category }) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      {category.map((item) => (
        <div className={burgerConstructorStyles.constructor} key={item._id}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={item.name + " (верх)"}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      ))}
    </article>
  );
}

function BottompProduct({ category }) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      {category.map((item) => (
        <div className={burgerConstructorStyles.constructor} key={item._id}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={item.name + " (низ)"}
            price={item.price}
            thumbnail={item.image}
          />
        </div>
      ))}
    </article>
  );
}

function ProductList({ category }) {
  return (
    <section>
      {category.map((card) => (
        <div
          className={`mb-4 mr-2 ${burgerConstructorStyles.ingredients}`}
          key={card._id}
        >
          <DragIcon />
          <div className={burgerConstructorStyles.inner}>
            <ConstructorElement
              text={card.name}
              price={200}
              thumbnail={card.image}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function MakeAnOrder({ onClick }) {
  return (
    <section className={`mr-4 ${burgerConstructorStyles.order}`}>
      <div className={burgerConstructorStyles.sum}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={onClick}>
        Оформить заказ
      </Button>
    </section>
  );
}

// Проверка данных
ProductList.propTypes = {
  category: PropTypes.arrayOf(type)
}

BurgerConstructor.propTypes = {
  onClick: PropTypes.func
};