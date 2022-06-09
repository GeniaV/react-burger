import {
  GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED, GET_SELECTED_INGREDIENTS,
  PUT_AN_ORDER, PUT_AN_ORDER_FAILED, ADD_INGREDIENT_DATA_IN_MODAL, REMOVE_INGREDIENT_DATA_FROM_MODAL,
  PUT_AN_ORDER_REQUEST, ADD_INGREDIENT, ADD_BUN, DELETE_INGREDIENT, REORDER_INGREDIENTS_IN_CONSTRUCTOR, RESET_CONSTRUCTOR
} from "../actions/types"

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
  bun: null,
  ingredients: []
};

export const selectedIngredientsReducer = (state = constructorInitialState, action) => {
  switch (action.type) {
    case GET_SELECTED_INGREDIENTS: {
      return {
        ...state,
      };
    }
    case ADD_BUN: {
      return {
        ...state,
        bun: action.payload
      }
    }
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      }
    }
    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients].filter(item => item.id !== action.payload.id)
      }
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...state,
        bun: null,
        ingredients: []
      }
    }
    case REORDER_INGREDIENTS_IN_CONSTRUCTOR: {
      return {
        ...state,
        ingredients: action.payload
      }
    }
    default: {
      return state;
    }
  }
};

const initialOrderNumberState = {
  orderNumber: '',
  putAnOrderRequest: false,
  putAnOrderFailed: false,
};

export const orderNumbertReducer = (state = initialOrderNumberState, action) => {
  switch (action.type) {
    case PUT_AN_ORDER_REQUEST: {
      return {
        ...state,
        putAnOrderRequest: true
      };
    }
    case PUT_AN_ORDER: {
      return { ...state, orderNumber: action.orderNumber, putAnOrderRequest: false, putAnOrderFailed: false };
    }
    case PUT_AN_ORDER_FAILED: {
      return { ...state, putAnOrderFailed: true, putAnOrderRequest: false };
    }
    default: {
      return state;
    }
  }
};

const initialIngredientState = {
  ingredientData: null,
  isIngredientDetailsOpened: false
};

export const ingredientDataReducer = (state = initialIngredientState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT_DATA_IN_MODAL: {
      return { ...state, ingredientData: action.ingredientData, isIngredientDetailsOpened: true };
    }
    case REMOVE_INGREDIENT_DATA_FROM_MODAL: {
      return { ...state, ingredientData: action.ingredientData, isIngredientDetailsOpened: false };
    }
    default: {
      return state;
    }
  }
};


