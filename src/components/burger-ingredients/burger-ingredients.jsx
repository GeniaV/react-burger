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
import { useInView } from 'react-intersection-observer';
import { useDrag } from "react-dnd";
import { nanoid } from 'nanoid';

const Tabs = React.memo(({ inViewBuns, inViewSaucess, inViewFilling }) => {
  const [current, setCurrent] = React.useState("Булки");

  React.useEffect(() => {
    if (inViewBuns) {
      setCurrent("Булки");
    } else if (inViewSaucess) {
      setCurrent("Соусы");
    } else if (inViewFilling) {
      setCurrent("Начинки");
    }
  }, [inViewBuns, inViewFilling, inViewSaucess]);

  const scrollToSection = (current, id) => {
    setCurrent(current);
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className={burgerIngredientsStyles.tabs}>
      <Tab value="Булки" active={current === "Булки"} onClick={() => { scrollToSection("Булки", 'buns') }}>
        Булки
      </Tab>
      <Tab value="Соусы" active={current === "Соусы"} onClick={() => { scrollToSection("Соусы", 'sauces') }}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === "Начинки"} onClick={() => { scrollToSection("Начинки", 'main') }}>
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

  const [bunRef, inViewBuns] = useInView({ threshold: 1 });
  const [sauceRef, inViewSaucess] = useInView({ threshold: 1 });
  const [mainRef, inViewFilling] = useInView({ threshold: 0.5 });

  return (
    <>
      {!ingredientsRequest && !ingredientsFailed && ingredients &&
        <section className="pl-8">
          <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>
          <Tabs inViewBuns={inViewBuns} inViewSaucess={inViewSaucess} inViewFilling={inViewFilling} />
          <section className={`mt-10 ${burgerIngredientsStyles.section}`}>
            <IngredientsCategory name="Булки" ref={bunRef} category={bunCategory} id="buns" />
            <IngredientsCategory name="Cоусы" ref={sauceRef} category={sausesCategory} id="sauces" />
            <IngredientsCategory name="Начинки" ref={mainRef} category={mainCategory} id="main" />
          </section>
        </section>
      }
    </>
  );
}

const IngredientsCategory = React.forwardRef(({ name, category, id }, ref) => {
  return (
    <div ref={ref}>
      <h2 className="text text_type_main-medium" id={id} >
        {name}
      </h2>
      <ProductList category={category} />
    </div>)
})

const ProductList = ({ category }) => {
  return (
    <section
      className={`pt-6 pl-4 pr-4 mb-10 ${burgerIngredientsStyles.items}`}
    >
      {category.map((card, index) => {
        return <Product key={index} card={card} />
      })}
    </section>
  );
}

const Product = ({ card }) => {
  const id  = card._id;
  const dispatch = useDispatch();

  const openIngredientDetails = (data) => {
    dispatch(addIngredientInModal(data))
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });


  return (
    !isDrag &&
    <article ref={dragRef} className={burgerIngredientsStyles.card} key={nanoid()} onClick={() => openIngredientDetails(card)}>
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
  );
}

// Проверка данных
ProductList.propTypes = {
  category: PropTypes.arrayOf(type).isRequired
}

Tabs.propTypes = {
  inViewBuns: PropTypes.bool.isRequired,
  inViewSaucess: PropTypes.bool.isRequired,
  inViewFilling: PropTypes.bool.isRequired
};

IngredientsCategory.propTypes = {
  name: PropTypes.string,
  category: PropTypes.arrayOf(type).isRequired,
  id: PropTypes.string
};

Product.propTypes = {
  card: type
};
