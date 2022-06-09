import { getIngredientsFromServer, putAnOrder } from "../../utils/api";
import { nanoid } from 'nanoid';
import {
  GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED,
  PUT_AN_ORDER, PUT_AN_ORDER_FAILED, PUT_AN_ORDER_REQUEST, ADD_INGREDIENT,
  ADD_BUN, DELETE_INGREDIENT, REORDER_INGREDIENTS_IN_CONSTRUCTOR
} from "./types";

export function getIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsFromServer()
      .then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      })
      .catch(err => {
        dispatch({
          type: GET_INGREDIENTS_FAILED,
          payload: `Произошла Ошибка получения данных об ингредиентах: ${err.message}`
        })
      })
  };
}

export function sendOrder(id) {
  return function (dispatch) {
    dispatch({
      type: PUT_AN_ORDER_REQUEST
    });
    putAnOrder(id)
      .then(res => {
        dispatch({
          type: PUT_AN_ORDER,
          orderNumber: res.order.number
        });
      })
      .catch(err => {
        dispatch({
          type: PUT_AN_ORDER_FAILED,
          payload: `Произошла Ошибка размещения заказа: ${err.message}`
        })
      })
  };
}

export function addIngredientInModal(ingredietData) {
  return {
    type: 'ADD_INGREDIENT_DATA_IN_MODAL',
    ingredientData: ingredietData
  }
}

export function removeIngredienFromModal() {
  return {
    type: 'REMOVE_INGREDIENT_DATA_FROM_MODAL',
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
