import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from "./types";
import { TOrder } from "../../utils/types"

export type TWsActions =
IWsConnectionSuccessAction
| IWsConnectionErrorAction
| IWsConnectionClosedAction
| IWsGetMessageAction;

interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
};

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
};

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

interface IWsGetMessageAction {
  readonly type: typeof WS_GET_ORDERS;
  payload: TOrder
};

export const wsGetMessage = (order: TOrder): IWsGetMessageAction => {
  return {
    type: WS_GET_ORDERS,
    payload: order
  };
};

