import { REQUEST_POST, RECEIVED_POST } from "../actions-type/index";

const initialState = {
  activities: [],
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
