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

export type TIngredientsResponse = {
  data: TIngredientWithUniqueId[];
  success: boolean;
}

export type TIngredientWithUniqueId = TIngredient & { id: string };

export type TOrderData = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TUser = {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
};

export type TOrderDetails = {
  ingredients: Array<string>;
  _id: string;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
  id?: string;
};

export type TOrder = {
  success: boolean;
  orders: TOrderDetails[];
  total: number;
  totalToday: number;
};

export type TDefaulResponse = {
  success: boolean;
  message: string;
};


export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

export type TWs = {
  wsInit: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};
