import React, { useEffect } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { type } from "../../utils/types";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from "../../services/actions/actions";
import { addIngredientInModal } from "../../services/actions/actions";

const Tabs = React.memo(({ bunRef, sauceRef, mainRef }) => {
  const [current, setCurrent] = React.useState("Булки");

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={burgerIngredientsStyles.tabs}>
      <Tab value="Булки" active={current === "Булки"} onClick={() => { setCurrent("Булки"); scrollToSection(bunRef) }}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"} onClick={() => { setCurrent("Соусы"); scrollToSection(sauceRef) }}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"} onClick={() => { setCurrent("Начинки"); scrollToSection(mainRef) }}>
        Начинки
      </Tab>
    </div>
  );
});

export function BurgerIngredients() {
  const { ingredients, ingredientsRequest, ingredientsFailed } = useSelector(store => store.ingredientsList);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, [dispatch])

  const bunCategory = React.useMemo(() => {
    return ingredients.filter((data) => data.type === "bun")
  }, [ingredients]);

  const sausesCategory = React.useMemo(() => {
    return ingredients.filter((data) => data.type === "sauce")
  }, [ingredients]);

  const mainCategory = React.useMemo(() => {
    return ingredients.filter((data) => data.type === "main")
  }, [ingredients]);

  const bunRef = React.useRef(null);
  const sauceRef = React.useRef(null);
  const mainRef = React.useRef(null);

  return (
    <>
      {!ingredientsRequest && !ingredientsFailed && ingredients &&
        <section className="pl-8">
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          <Tabs bunRef={bunRef} sauceRef={sauceRef} mainRef={mainRef} />
          <section className={`mt-10 ${burgerIngredientsStyles.section}`}>
            <h2 className="text text_type_main-medium" ref={bunRef}>
              Булки
            </h2>
            <ProductList category={bunCategory} />
            <h2 className="text text_type_main-medium" ref={sauceRef}>
              Cоусы
            </h2>
            <ProductList category={sausesCategory} />
            <h2 className="text text_type_main-medium" ref={mainRef}>
              Начинки
            </h2>
            <ProductList category={mainCategory} />
          </section>
        </section>
      }
    </>
  );
}

function ProductList({ category }) {
  const dispatch = useDispatch();

  const openIngredientDetails = (data) => {
    dispatch(addIngredientInModal(data))
  }

  return (
    <section
      className={`pt-6 pl-4 pr-4 mb-10 ${burgerIngredientsStyles.items}`}
    >
      {category.map((card) => (
        <article className={burgerIngredientsStyles.card} key={card._id} onClick={() => openIngredientDetails(card)}>
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
  category: PropTypes.arrayOf(type).isRequired
}

Tabs.propTypes = {
  bunRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  sauceRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  mainRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
