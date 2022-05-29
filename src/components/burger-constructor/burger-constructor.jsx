import React, { useEffect } from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { type } from "../../utils/types";
import PropTypes from "prop-types";
import { TotalPriceContext } from "../../services/appContext";
import { useSelector } from 'react-redux';

export function BurgerConstructor({ onClick }) {
  const totalPriceState = React.useState(null);

  const { bun, ingredients } = useSelector(store => store.selectedIngredients);

  return (
    <section className="mt-25 ml-4 mr-8">
      <div className="mb-10">
        {bun && <TopProduct bun={bun} />}
        <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
          {ingredients && <ProductList innerIngredients={ingredients} />}
        </section>
        {bun && <BottomProduct bun={bun} />}
      </div>
      <TotalPriceContext.Provider value={totalPriceState}>
        <MakeAnOrder onClick={onClick} bun={bun} ingredients={ingredients} />
      </TotalPriceContext.Provider>
    </section>
  );
}

function TopProduct({ bun }) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      <div className={burgerConstructorStyles.constructor} key={bun._id}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    </article>)
}

function BottomProduct({ bun }) {
  return (
    <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
      <div className={burgerConstructorStyles.constructor} key={bun._id}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    </article>
  );
}

function ProductList({ innerIngredients }) {
  return (
    <section>
      {innerIngredients.map((card) => (
        <div
          className={`mb-4 mr-2 ${burgerConstructorStyles.ingredients}`}
          key={card._id}
        >
          <DragIcon />
          <div className={burgerConstructorStyles.inner}>
            <ConstructorElement
              text={card.name}
              price={card.price}
              thumbnail={card.image}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function MakeAnOrder({ onClick, bun, ingredients }) {
  const [totalPrice, setTotalPrice] = React.useContext(TotalPriceContext);

  useEffect(() => {
    let total = 0;
    if (ingredients === [] && bun === null) {
      total = 0;
    }
    if (bun !== null && ingredients !== []) {
      ingredients.map(item => total = item.price + bun.price * 2);
    }
    if (bun !== null) {
      total = bun.price * 2
    }
    if (ingredients !== []) {
      ingredients.map(item => total += item.price);
    }
    setTotalPrice(total);
  },
    [setTotalPrice]
  );

  return (
    <section className={`mr-4 ${burgerConstructorStyles.order}`}>
      <div className={burgerConstructorStyles.sum}>
        <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button type="primary" size="large" onClick={onClick}>
        Оформить заказ
      </Button>
    </section>
  );
}

// // Проверка данных
BurgerConstructor.propTypes = {
  onClick: PropTypes.func
};

TopProduct.propTypes = {
  bun: type
}

BottomProduct.propTypes = {
  bun: type
}

ProductList.propTypes = {
  innerIngredients: PropTypes.arrayOf(type).isRequired
}

MakeAnOrder.propTypes = {
  onClick: PropTypes.func,
  bun: type,
  ingredients: PropTypes.arrayOf(type).isRequired
};
