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

export function BurgerConstructor(props) {
  return (
    <section className="mt-25 ml-4 mr-8">
      <div className="mb-10">
        <TopProduct
          category={props.ingredients.filter(
            (data) => data._id === "60d3b41abdacab0026a733c6"
          )}
        />
        <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
          <ProductList
            category={props.ingredients.filter(
              (data) => data.type === "sauce" || data.type === "main"
            )}
          />
        </section>
        <BottompProduct
          category={props.ingredients.filter(
            (data) => data._id === "60d3b41abdacab0026a733c6"
          )}
        />
      </div>
      <MakeAnOrder onClick={props.onClick} />
    </section>
  );
}

function TopProduct(props) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      {props.category.map((item) => (
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

function BottompProduct(props) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      {props.category.map((item) => (
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

function ProductList(props) {
  return (
    <section>
      {props.category.map((card) => (
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

function MakeAnOrder(props) {
  return (
    <section className={`mr-4 ${burgerConstructorStyles.order}`}>
      <div className={burgerConstructorStyles.sum}>
        <p className="text text_type_digits-medium mr-2">610</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={props.onClick}>
        Оформить заказ
      </Button>
    </section>
  );
}

// Проверка данных
ProductList.propTypes = type;

BurgerConstructor.propTypes = {
  onClick: PropTypes.func
};
