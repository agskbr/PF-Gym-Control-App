import {
  REQUEST_POST,
  RECEIVED_POST,
  GET_ALL_TRAINERS,
} from "../actions-type/index";

const initialState = {
  activities: [],
  trainers: [],
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TRAINERS:
      return {
        ...state,
        trainers: action.payload,
      };
    case REQUEST_POST:
      return { ...state, isLoading: true };

    case RECEIVED_POST:
      return { ...state, isLoading: false };

    default:
      return {
        ...state,
      };
  }
};

export { rootReducer };
