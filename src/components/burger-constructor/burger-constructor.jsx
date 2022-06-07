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
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { addToConstructorBun, addToConstructorIngredient, deleteIngredientFromConstructor } from "../../services/actions/actions";
import { nanoid } from 'nanoid';

export function BurgerConstructor({ onClick }) {
  const { bun, ingredients } = useSelector(store => store.selectedIngredients);
  const items = useSelector(store => store.ingredientsList.ingredients);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      const draggedCard = items.find((el) => el._id === item.id);
      if (draggedCard.type !== "bun") {
        dispatch(addToConstructorIngredient(draggedCard));
      } else {
        dispatch(addToConstructorBun(draggedCard));
      }
    }
  })

  return (
    <section className="mt-25 ml-4 mr-8" ref={dropTarget}>
      <div className="mb-10">
        {bun && <TopProduct bun={bun} />}
        <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
          {ingredients && <ProductList innerIngredients={ingredients} />}
        </section>
        {bun && <BottomProduct bun={bun} />}
      </div>
      <MakeAnOrder onClick={onClick} bun={bun} ingredients={ingredients} />
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
  const dispatch = useDispatch();
  return (
    <section>
      {innerIngredients.map((card) => (
        <div
          className={`mb-4 mr-2 ${burgerConstructorStyles.ingredients}`}
          key={nanoid()}
        >
          <DragIcon />
          <div className={burgerConstructorStyles.inner}>
            <ConstructorElement
              text={card.name}
              price={card.price}
              thumbnail={card.image}
              handleClose={() => dispatch(deleteIngredientFromConstructor(card))}
            />
          </div>
        </div>
      ))}
    </section>
  );
}

function MakeAnOrder({ onClick }) {
  const constructorItems = useSelector(store => store.selectedIngredients);

  const price = React.useMemo(() => {
    return (
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce((s, v) => s + v.price, 0)
    );
  }, [constructorItems]);

  return (
    <section className={`mr-4 ${burgerConstructorStyles.order}`}>
      <div className={burgerConstructorStyles.sum}>
        <p className="text text_type_digits-medium mr-2">{price}</p>
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
