import { getIngredientsFromServer, putAnOrder } from "../../utils/api";
import { nanoid } from 'nanoid';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

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

export const GET_SELECTED_INGREDIENTS = 'GET_SELECTED_INGREDIENTS ';

export const PUT_AN_ORDER_REQUEST = 'PUT_AN_ORDER_REQUEST';
export const PUT_AN_ORDER = 'PUT_AN_ORDER';
export const PUT_AN_ORDER_FAILED = 'PUT_AN_ORDER_FAILED';

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

export const ADD_INGREDIENT_DATA_IN_MODAL = 'ADD_INGREDIENT_DATA_IN_MODAL';
export const REMOVE_INGREDIENT_DATA_FROM_MODAL = 'REMOVE_INGREDIENT_DATA_FROM_MODAL';

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

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_BUN = 'ADD_BUN';

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

export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';

export function deleteIngredientFromConstructor(ingredient) {
  return {
    type: DELETE_INGREDIENT,
    payload: {
      ...ingredient
    }
  }
}

export const REORDER_INGREDIENTS_IN_CONSTRUCTOR = 'REORDER_INGREDIENTS_IN_CONSTRUCTOR';

export const reorderIngredientsInConstructor = (ingredientsArray) => {
  return {
    type: REORDER_INGREDIENTS_IN_CONSTRUCTOR,
    payload: ingredientsArray
  }
}
