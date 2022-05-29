import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, GET_SELECTED_INGREDIENTS, PUT_AN_ORDER, PUT_AN_ORDER_FAILED } from "../actions/actions"

const initiaIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
};

export const ingredientsListReducer = (state = initiaIngredientsState, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, ingredientsFailed: false, ingredients: action.ingredients, ingredientsRequest: false };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, ingredientsFailed: true, ingredientsRequest: false };
    }
    default: {
      return state;
    }
  }
};

const constructorInitialState = {
  bun: {
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    name: "Краторная булка N-200i",
    price: 1255,
    proteins: 80,
    type: "bun",
    __v: 0,
    _id: "60d3b41abdacab0026a733c6"
  },
  ingredients: [{
    calories: 99,
    carbohydrates: 42,
    fat: 24,
    image: "https://code.s3.yandex.net/react/code/sauce-03.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    name: "Соус традиционный галактический",
    price: 15,
    proteins: 42,
    type: "sauce",
    __v: 0,
    _id: "60d3b41abdacab0026a733ce"
  }]
};

export const selectedIngredientsReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case GET_SELECTED_INGREDIENTS: {
      return {
        ...state,
      };
    }
    default: {
      return state;
    }
  }
};

const initialIngredientState = {
  ingredient: []
};

const initialOrderNumberState = {
  orderNumber: '',
  putAnOrderFailed: false,
};

export const orderNumbertReducer = (state = initialOrderNumberState, action) => {
  switch (action.type) {
    case PUT_AN_ORDER: {
      return { ...state, orderNumber: action.orderNumber };
    }
    case PUT_AN_ORDER_FAILED: {
      return { ...state, putAnOrderFailed: true };
    }
    default: {
      return state;
    }
  }
};
