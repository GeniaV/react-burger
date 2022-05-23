import React from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { type } from "../../utils/types";
import PropTypes from "prop-types";

function Tabs({ bunRef, sauseRef, mainRef }) {
  const [current, setCurrent] = React.useState("Булки");

  const scrollToSection = (elementRef) => {
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={burgerIngredientsStyles.tabs}>
      <Tab value="Булки" active={current === "Булки"} onClick={() => { setCurrent("Булки"); scrollToSection(bunRef) }}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"} onClick={() => { setCurrent("Соусы"); scrollToSection(sauseRef) }}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"} onClick={() => { setCurrent("Начинки"); scrollToSection(mainRef) }}>
        Начинки
      </Tab>
    </div>
  );
}

export function BurgerIngredients({ ingredients, onClick }) {
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
  const sauseRef = React.useRef(null);
  const mainRef = React.useRef(null);

  return (
    <section className="pl-8">
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
      <Tabs bunRef={bunRef} sauseRef={sauseRef} mainRef={mainRef} />
      <section className={`mt-10 ${burgerIngredientsStyles.section}`}>
        <h2 className="text text_type_main-medium" ref={bunRef}>
          Булки
        </h2>
        <ProductList category={bunCategory} onClick={onClick} />
        <h2 className="text text_type_main-medium" ref={sauseRef}>
          Cоусы
        </h2>
        <ProductList category={sausesCategory} onClick={onClick} />
        <h2 className="text text_type_main-medium" ref={mainRef}>
          Начинки
        </h2>
        <ProductList category={mainCategory} onClick={onClick} />
      </section>
    </section>
  );
}

function ProductList({ category, onClick }) {
  return (
    <section
      className={`pt-6 pl-4 pr-4 mb-10 ${burgerIngredientsStyles.items}`}
    >
      {category.map((card) => (
        <article className={burgerIngredientsStyles.card} key={card._id} onClick={() => onClick(card)}>
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
  category: PropTypes.arrayOf(type).isRequired,
  onClick: PropTypes.func
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(type).isRequired,
  onClick: PropTypes.func
};

Tabs.propTypes = {
  bunRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  sauseRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  mainRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
