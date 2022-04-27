import React from "react";
import burgerConstructorStyles from "./burger-constructor.module.css";
import {
  CurrencyIcon,
  DragIcon,
  ConstructorElement,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { data } from "../../utils/data";
import PropTypes from 'prop-types';

export class BurgerConstructor extends React.Component {
  render() {
    return (
      <section className="mt-25 ml-4 mr-8">
        <div className="mb-10">
          <TopProduct description={data} />
          <section className={`mt-4 mb-4 ${burgerConstructorStyles.section}`}>
            <ProductList
              description={data.filter(
                (data) => data.type === "sauce" || data.type === "main"
              )}
            />
          </section>
          <BottompProduct description={data} />
        </div>
        <MakeAnOrder description={data}/>
      </section>
    );
  }
}

class TopProduct extends React.Component {
  render() {
    return (
      <article className={`mr-4 ${burgerConstructorStyles.bun}`}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={this.props.description[0].name + " (верх)"}
            price={200}
            thumbnail={this.props.description[0].image}
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
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={this.props.description[0].name + " (низ)"}
            price={200}
            thumbnail={this.props.description[0].image}
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
        {this.props.description.map((card) => (
          <div
            className={`mb-4 mr-2 ${burgerConstructorStyles.ingredients}`}
            key={card._id}
          >
            <DragIcon />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "536px",
              }}
            >
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
ProductList.propTypes = {
  description: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      proteins: PropTypes.number,
      fat: PropTypes.number,
      carbohydrates: PropTypes.number,
      calories: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string,
      image_mobile: PropTypes.string,
      image_large: PropTypes.string,
      __v: PropTypes.number,
    })
  ),
};