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
import { IngredientsContext, TotalPriceContext } from "../../services/appContext";

export function BurgerConstructor({ onClick }) {

  const totalPriceState = React.useState(null);

  const constructorItems = React.useContext(IngredientsContext);

  return (
    <section className="mt-25 ml-4 mr-8">
      <div className="mb-10">
        {constructorItems.bun && <TopProduct bun={constructorItems.bun} />}
        <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
          {constructorItems.ingredients && <ProductList innerIngredients={constructorItems.ingredients} />}
        </section>
        {constructorItems.bun && <BottomProduct bun={constructorItems.bun} />}
      </div>
      <IngredientsContext.Provider value={constructorItems}>
        <TotalPriceContext.Provider value={totalPriceState}>
          <MakeAnOrder onClick={onClick} />
        </TotalPriceContext.Provider>
      </IngredientsContext.Provider>
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

function MakeAnOrder({ onClick }) {
  const [totalPrice, setTotalPrice] = React.useContext(TotalPriceContext);
  const constructorItems = React.useContext(IngredientsContext);

  useEffect(() => {
      let total = 0;
      if(constructorItems.ingredients === [] && constructorItems.bun === null) {
        total = 0;
      }
      if(constructorItems.bun !== null && constructorItems.ingredients !== []) {
        constructorItems.ingredients.map(item => total = item.price + constructorItems.bun.price*2);
      }
      if(constructorItems.bun !== null) {
        total = constructorItems.bun.price*2
      }
      if(constructorItems.ingredients !== []) {
        constructorItems.ingredients.map(item => total += item.price);
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
  onClick: PropTypes.func
};
