import React from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { type } from "../../utils/types";

export function BurgerConstructor(props) {
  return (
    <section className="mt-25 ml-4 mr-8">
      <div className="mb-10">
        <TopProduct category={props.ingredients} />
        <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
          <ProductList
            category={props.ingredients.filter(
              (data) => data.type === "sauce" || data.type === "main"
            )}
          />
        </section>
        <BottompProduct category={props.ingredients} />
      </div>
      <MakeAnOrder onClick={props.onClick}/>
    </section>
  );
}

function TopProduct(props) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      <div className={burgerConstructorStyles.constructor}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={props.category[0].name + " (верх)"}
          price={200}
          thumbnail={props.category[0].image}
        />
      </div>
    </article>
  );
}

function BottompProduct(props) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      <div className={burgerConstructorStyles.constructor}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={props.category[0].name + " (низ)"}
          price={props.category[0].price}
          thumbnail={props.category[0].image}
        />
      </div>
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
