import {
  REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED,
  LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILED
} from "./types";
import { createUser, logInItoAccount, logOutFromAccount } from "../../utils/api";
import { setCookie, deleteCookie } from "../../utils/utils";

//Регистрация
function registerUserOnServerSuccess(res) {
  return {
    type: REGISTER_SUCCESS,
    payload: res.user
  }
}

function registerUserOnServerFailed(err) {
  return {
    type: REGISTER_FAILED,
    payload: `Произошла Ошибка регистрации пользователя: ${err.message}`
  }
}

export function register(email, password, name) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    createUser(email, password, name)
      .then(res => {
        let authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        localStorage.setItem('token', res.refreshToken);
        if (res && res.success) {
          dispatch(registerUserOnServerSuccess(res));
        } else {
          dispatch(registerUserOnServerFailed());
        }
      })
      .catch(err => {
        dispatch(registerUserOnServerFailed(err));
      })
  };
}

//Авторизация
function loginOnServerSuccess(res) {
  return {
    type: LOGIN_SUCCESS,
    payload: res.user
  }
}

function loginOnServerFailed(err) {
  return {
    type: LOGIN_FAILED,
    payload: `Произошла Ошибка авторизации: ${err.message}`
  }
}

export function login(email, password) {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    logInItoAccount(email, password)
      .then(res => {
        let authToken = res.accessToken.split('Bearer ')[1];
        setCookie('token', authToken);
        localStorage.setItem('token', res.refreshToken);
        if (res && res.success) {
          dispatch(loginOnServerSuccess(res));
        } else {
          dispatch(loginOnServerFailed());
        }
      })
      .catch(err => {
        dispatch(loginOnServerFailed(err));
      })
  };
}

//Выход из системы
export function logout(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST
    });
    logOutFromAccount(refreshToken)
      .then(res => {
        deleteCookie('token');
        localStorage.removeItem('refreshToken');
      })
      .catch(err => {

      })
  };
}





