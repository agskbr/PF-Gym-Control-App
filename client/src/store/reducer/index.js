import {
  REQUEST_POST,
  RECEIVED_POST,
  GET_ALL_TRAINERS,
} from "../actions-type/index";

const initialState = {
  allActivities: [],
  activities: [],
  trainers: [],
  detail: [],
  /* days: [],
  hour: [], */
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

    case 'GET_ACTIVITY':
      return { 
        ...state,
        activities: action.payload,
        allActivities: action.payload,
      };

    case 'GET_ACTIVITY_DETAIL':
      return {
        ...state,
        detail: action.payload,
      };

    /* case 'GET_DAYS':
        return {
          ...state,
          days: action.payload,
        };
    case 'GET_HOUR':
          return {
            ...state,
            hour: action.payload,
          };
 */
    case 'FILTER_BY_DAY': {
        const allActiv = state.allActivities;
        const filteredDay = 
        action.payload === 'all'
          ? allActiv
          : allActiv.filter((activity) => activity.days.includes(action.payload));
        return { ...state, activities: filteredDay };
      }

    case 'FILTER_BY_HOUR': {
        const allActiv = state.allActivities;
        const filteredHour =
          action.payload === 'all'
            ? allActiv
            : allActiv.filter((activity) => activity.hour.includes(action.payload));
        return { ...state, activities: filteredHour };
      }

    default:
      return {
        ...state,
      };
  }
};

export { rootReducer };
