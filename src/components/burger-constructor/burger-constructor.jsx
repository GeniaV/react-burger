import { useMemo, useRef } from "react";
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
import { useDrop, useDrag } from "react-dnd";
import { addToConstructorBun, addToConstructorIngredient, deleteIngredientFromConstructor, reorderIngredientsInConstructor } from "../../services/actions/actions";

export function BurgerConstructor({ onClick }) {
  const { bun, ingredients } = useSelector(store => store.selectedIngredients);
  const allIngredients = useSelector(store => store.ingredientsList.ingredients);
  const dispatch = useDispatch();

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      const draggedCard = allIngredients.find((el) => el._id === item.id);
      if (draggedCard.type !== "bun") {
        dispatch(addToConstructorIngredient(draggedCard));
      } else {
        dispatch(addToConstructorBun(draggedCard));
      }
    }
  })

  return (
    <section className="mt-25 ml-4 mr-8" ref={dropTarget}>
      {bun === null && ingredients.length === 0 ? (<div className={`mb-8 ${burgerConstructorStyles.containerForText}`}>
        <p className={`text text_type_main-medium pt-8 pb-8 pl-8 pr-8 ${burgerConstructorStyles.empty}`}>Перетащите ингредиенты слева сюда</p>
      </div>) :
        (<div className="mb-10">
          {bun && <TopProduct />}
          {ingredients && <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
            <ProductList />
          </section>}
          {bun && <BottomProduct />}
        </div>)}
      <MakeAnOrder onClick={onClick} />
    </section>
  );
}

function TopProduct() {
  const { bun } = useSelector(store => store.selectedIngredients);
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

function BottomProduct() {
  const { bun } = useSelector(store => store.selectedIngredients);
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

function ProductList() {
  const { ingredients } = useSelector(store => store.selectedIngredients);
  return (
    <section>
      {ingredients.map((card, index) => (
        <ProductCard card={card} key={card.id} index={index} />
      ))}
    </section>
  );
}

function ProductCard({ card, index }) {
  const { ingredients } = useSelector(store => store.selectedIngredients);
  const id = card.id;
  const ref = useRef(null);
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: "ingredient-item",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    })
  }));

  const [{ isOver, canDrop }, dropTarget] = useDrop({
    accept: 'ingredient-item',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),

    drop(item) {
      const dragIndex = ingredients.findIndex((elem) => elem.id === item.id);
      const hoverIndex = index;

      const newIngredients = [...ingredients];

      let hoverIngredient = newIngredients[hoverIndex];

      newIngredients[hoverIndex] = newIngredients[dragIndex];
      newIngredients[dragIndex] = hoverIngredient;

      dispatch(reorderIngredientsInConstructor(newIngredients))
    }
  })

  const dragAndDropItem = dragRef(dropTarget(ref));

  const isActive = canDrop && isOver
  let boxShadow = 'none';
  let borderRadius = 'none';
  if (isActive) {
    boxShadow = '0px 4px 8px #4C4CFF';
    borderRadius = '40px';
  } else if (canDrop) {
    boxShadow = 'none'
  }

  return (
    <section className={`mb-4 mr-2 ${burgerConstructorStyles.ingredients}`} ref={dragAndDropItem}>
      <DragIcon />
      <div className={burgerConstructorStyles.inner} style={{ boxShadow, borderRadius }}>
        <ConstructorElement
          text={card.name}
          price={card.price}
          thumbnail={card.image}
          handleClose={() => dispatch(deleteIngredientFromConstructor(card))}
        />
      </div>
    </section>
  )
}

function MakeAnOrder({ onClick }) {
  const constructorItems = useSelector(store => store.selectedIngredients);

  const price = useMemo(() => {
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
      {!constructorItems.bun ? (
        <Button type="primary" size="large" onClick={onClick} disabled>
          Оформить заказ
        </Button>
      ) : (<Button type="primary" size="large" onClick={onClick}>
        Оформить заказ
      </Button>)}

    </section>
  );
}

// Проверка данных
BurgerConstructor.propTypes = {
  onClick: PropTypes.func
};

MakeAnOrder.propTypes = {
  onClick: PropTypes.func
};

ProductCard.propTypes = {
  card: type,
  index: PropTypes.number
}
