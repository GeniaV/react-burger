import { getIngredientsFromServer, putAnOrder } from "../../utils/api";

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
        console.log(err);
        dispatch({
          type: GET_INGREDIENTS_FAILED
        })
      })
  };
}

export const GET_SELECTED_INGREDIENTS = 'GET_SELECTED_INGREDIENTS ';

export const PUT_AN_ORDER = 'PUT_AN_ORDER';
export const PUT_AN_ORDER_FAILED = 'PUT_AN_ORDER_FAILED';

export function sendOrder(id) {
  return function (dispatch) {
    putAnOrder(id)
      .then(res => {
        dispatch({
          type: PUT_AN_ORDER,
          orderNumber: res.order.number,
        });
      })
      .catch(err => {
        console.log(err);
        dispatch({
          type: PUT_AN_ORDER_FAILED,
        })
      })
  };
}

