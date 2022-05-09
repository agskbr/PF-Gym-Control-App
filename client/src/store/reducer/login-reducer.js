import {
  LOGIN_WITH_GOOGLE,
  REGISTER_USER_WITH_EMAIL_AND_PASS,
  USER_IS_ADMIN,
  USER_SIGN_OUT,
  VALIDATE_USER_IS_LOGGED,
} from "../actions-type";

const initialState = {
  user: null,
  isAdmin: null,
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        user: action.payload,
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
