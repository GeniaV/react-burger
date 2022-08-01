import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_REQUEST } from "./types";
import { getIngredientsFromServer } from "../../utils/api";
import { TIngredient } from "../../utils/types";
import { AppThunk } from "../../utils/types";
import { AppDispatch } from "../../utils/types";

export type TGetIngredientsActions =
IGetIngredientsFromServerSuccessAction
| IShowErrorWhenGetIngredietsFailedAction
| IGetIngredientsRequestAction;

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}

export interface IGetIngredientsFromServerSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly ingredients: TIngredient[];
};

export interface IShowErrorWhenGetIngredietsFailedAction {
  readonly type: typeof GET_INGREDIENTS_FAILED;
  readonly payload: string;
};

const getIngredientsFromServerSuccess = (res: { data: TIngredient[] }): IGetIngredientsFromServerSuccessAction => {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: res.data
  }
}

const showErrorWhenGetIngredietsFailed = (err: { message: string }): IShowErrorWhenGetIngredietsFailedAction => {
  return {
    type: GET_INGREDIENTS_FAILED,
    payload: `Произошла Ошибка получения данных об ингредиентах: ${err.message}`
  }
}

export const getIngredients: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsFromServer()
      .then(res => {
        if (res && res.success) {
          dispatch(getIngredientsFromServerSuccess(res));
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED
          });
        }
      })
      .catch(err => {
        dispatch(showErrorWhenGetIngredietsFailed(err));
      })
  };
};
