//data by pgym reducer
const CREATE_ACTIVITY = "CREATE_ACTIVITY";
const GET_ALL_TRAINERS = "GET_ALL_TRAINERS";
const GET_ALL_USERS = "GET_ALL_USERS";
const REQUEST_POST = "REQUEST_POST";
const RECEIVED_POST = "RECEIVED_POST";
const GET_ID_USER = "GET_ID_USER"
//-----------------

//data by review reducer
const GET_ALL_REVIEWS = "GET_ALL_REVIEWS";
const CREATE_REVIEW = "CREATE_REVIEW";
const GET_REVIEWS_BY_USER = "GET_REVIEWS_BY_USER";
//-----------------

//Data by login reducer
const USER_IS_ADMIN = "USER_IS_ADMIN";
const LOGIN_WITH_GOOGLE = "LOGIN_WITH_GOOGLE";
const LOGIN_WITH_GITHUB = "LOGIN_WITH_GITHUB";
const REQUEST_USER_LOGIN = "REQUEST_USER_LOGIN";
const RECEIVED_USER_LOGIN = "RECEIVED_USER_LOGIN";
const VALIDATE_USER_IS_LOGGED = "VALIDATE_USER_IS_LOGGED";
const REGISTER_USER_WITH_EMAIL_AND_PASS = "REGISTER_USER_WITH_EMAIL_AND_PASS";
const SIGN_IN_USER = "SIGN_IN_USER";
const USER_SIGN_OUT = "USER_SIGN_OUT";
//-----------------

// SHOPPING CART
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_ONE_FROM_CART = "REMOVE_ONE_FROM_CART";
export const REMOVE_ALL_FROM_CART = "REMOVE_ALL_FROM_CART";
export const CLEAR_CART = "CLEAR_CART";
export const TOTAL_CART = "TOTAL_CART";
// END SHOPPING CART

//ORDER LINE
export const ADD_ORDER_LINE = "ADD_ORDER_LINE";


export {
  CREATE_ACTIVITY,
  REQUEST_POST,
  RECEIVED_POST,
  GET_ALL_TRAINERS,
  REGISTER_USER_WITH_EMAIL_AND_PASS,
  VALIDATE_USER_IS_LOGGED,
  LOGIN_WITH_GOOGLE,
  SIGN_IN_USER,
  USER_SIGN_OUT,
  CREATE_REVIEW,
  GET_ALL_USERS,
  GET_ALL_REVIEWS,
  USER_IS_ADMIN,
  GET_REVIEWS_BY_USER,
  REQUEST_USER_LOGIN,
  RECEIVED_USER_LOGIN,
  LOGIN_WITH_GITHUB,
  GET_ID_USER
};
