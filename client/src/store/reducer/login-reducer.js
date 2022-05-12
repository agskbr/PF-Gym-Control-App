import {
  LOGIN_WITH_GOOGLE,
  REGISTER_USER_WITH_EMAIL_AND_PASS,
  USER_IS_ADMIN,
  USER_SIGN_OUT,
  VALIDATE_USER_IS_LOGGED,
  REQUEST_USER_LOGIN,
  RECEIVED_USER_LOGIN,
  LOGIN_WITH_GITHUB,
} from "../actions-type";

const initialState = {
  user: null,
  isAdmin: null,
  isLoading: false,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
      };
    case RECEIVED_USER_LOGIN:
      return {
        ...state,
        isLoading: false,
      };
    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        user: { ...action.payload.user },
      };
    case LOGIN_WITH_GITHUB:
      return {
        ...state,
        user: { ...action.payload.user },
      };
    case USER_IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };

    case REGISTER_USER_WITH_EMAIL_AND_PASS:
      return {
        ...state,
        user: action.payload,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    case VALIDATE_USER_IS_LOGGED:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};

export { loginReducer };
