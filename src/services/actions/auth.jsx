import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "./types";
import { createUser, logInItoAccount } from "../../utils/api";

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
  return function(dispatch) {
    dispatch({
      type: REGISTER_REQUEST
    });
    createUser(email, password, name)
      .then(res => {
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
  return function(dispatch) {
    dispatch({
      type: LOGIN_REQUEST
    });
    logInItoAccount(email, password)
      .then(res => {
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
