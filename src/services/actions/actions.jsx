import { getIngredientsFromServer, putAnOrder } from "../../utils/api";
import { nanoid } from 'nanoid';
import {
  GET_INGREDIENTS_REQUEST, PUT_AN_ORDER, PUT_AN_ORDER_FAILED, PUT_AN_ORDER_REQUEST, ADD_INGREDIENT,
  ADD_BUN, DELETE_INGREDIENT, REORDER_INGREDIENTS_IN_CONSTRUCTOR, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
  ADD_INGREDIENT_DATA_IN_MODAL, REMOVE_INGREDIENT_DATA_FROM_MODAL, RESET_CONSTRUCTOR
} from "./types";

function getIngredientsFromServerSuccess(res) {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: res.data
  }
}

function showErrorWhenGetIngredietsFailed(err) {
  return {
    type: GET_INGREDIENTS_FAILED,
    payload: `Произошла Ошибка получения данных об ингредиентах: ${err.message}`
  }
}

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsFromServer()
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsFromServerSuccess(res));
        } else {
          dispatch(showErrorWhenGetIngredietsFailed());
        }
      })
      .catch(err => {
        dispatch(showErrorWhenGetIngredietsFailed(err));
      })
  };
}

function putAnOrderOnServer(res) {
  return {
    type: PUT_AN_ORDER,
    orderNumber: res.order.number
  }
}

function showErrorWhenPutAnOrderFailed(err) {
  return {
    type: PUT_AN_ORDER_FAILED,
    payload: `Произошла Ошибка размещения заказа: ${err.message}`
  }
}

export function sendOrder(id) {
  return function(dispatch) {
    dispatch({
      type: PUT_AN_ORDER_REQUEST
    });
    putAnOrder(id)
      .then(res => {
        dispatch(putAnOrderOnServer(res));
        dispatch(resetConstructor());
      })
      .catch(err => {
        dispatch(showErrorWhenPutAnOrderFailed(err))
      })
  };
}

export function addIngredientInModal(ingredietData) {
  return {
    type: ADD_INGREDIENT_DATA_IN_MODAL,
    ingredientData: ingredietData
  }
}

export function removeIngredienFromModal() {
  return {
    type: REMOVE_INGREDIENT_DATA_FROM_MODAL,
    ingredientData: ''
  }
}

export function addToConstructorIngredient(ingredient) {
  return {
    type: ADD_INGREDIENT,
    payload: {
      ...ingredient,
      id: nanoid()
    }
  }
}

export function addToConstructorBun(ingredient) {
  return {
    type: ADD_BUN,
    payload: ingredient
  }
}

export function deleteIngredientFromConstructor(ingredient) {
  return {
    type: DELETE_INGREDIENT,
    payload: {
      ...ingredient
    }
  }
}

export const reorderIngredientsInConstructor = (ingredientsArray) => {
  return {
    type: REORDER_INGREDIENTS_IN_CONSTRUCTOR,
    payload: ingredientsArray
  }
}

export const resetConstructor = () => {
  return {
    type: RESET_CONSTRUCTOR
  }
}
