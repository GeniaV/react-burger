import React from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import { type } from "../../utils/types";

export class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className="mt-25 ml-4 mr-8">
        <div className="mb-10">
          <TopProduct category={data} />
          <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
            <ProductList
              category={data.filter(
                (data) => data.type === "sauce" || data.type === "main"
              )}
            />
          </section>
          <BottompProduct category={data} />
        </div>
        <MakeAnOrder category={data} />
      </section>
    );
  }
}

class TopProduct extends React.Component {
  render() {
    return (
      <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
        <div className={burgerConstructorStyles.constructor}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={this.props.category[0].name + " (верх)"}
            price={200}
            thumbnail={this.props.category[0].image}
          />
        </div>
      </article>
    );
  }
}

class BottompProduct extends React.Component {
  render() {
    return (
      <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
        <div className={burgerConstructorStyles.constructor}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={this.props.category[0].name + " (низ)"}
            price={200}
            thumbnail={this.props.category[0].image}
          />
        </div>
      </article>
    );
  }
}

class MakeAnOrder extends React.Component {
  render() {
    return (
      <section className={`mr-4 ${burgerConstructorStyles.order}`}>
        <div className={burgerConstructorStyles.sum}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </section>
    );
  }
}

class ProductList extends React.Component {
  render() {
    return (
      <section>
        {this.props.category.map((card) => (
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
}

// Проверка данных
ProductList.propTypes = type;