import { TIngredientInModalActions } from '../services/actions/ingredient';
import { TPutAnPrderActions } from '../services/actions/order';
import { ThunkAction } from 'redux-thunk';
import { store } from '../services/store';
import { Action, ActionCreator } from 'redux';

type TApplicationActions = TIngredientInModalActions | TPutAnPrderActions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ActionCreator<
	ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type TIngredientWithUniqueId = TIngredient & { id: string};

export type TOrderData = {
  name: string;
  order: { number: number };
  success: boolean;
};
