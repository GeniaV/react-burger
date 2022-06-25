import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILED, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILED } from "../actions/types";

const initialState = {
  user: null,

  registerRequest: false,
  registerFailed: false,

  loginRequest: false,
  loginFailed: false
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false
      };
    }
    case REGISTER_SUCCESS: {
      return { ...state, registerFailed: false, user: action.payload, registerRequest: false };
    }
    case REGISTER_FAILED: {
      return { ...state, registerFailed: true, registerRequest: false };
    }

    case LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false
      };
    }
    case LOGIN_SUCCESS: {
      return { ...state, loginFailed: false, user: action.payload, loginRequest: false };
    }
    case LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false };
    }

    default: {
      return state;
    }
  }
};
