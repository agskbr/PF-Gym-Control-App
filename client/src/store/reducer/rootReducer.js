import {
  REQUEST_POST,
  RECEIVED_POST,
  LOGIN_WITH_GOOGLE,
  GET_ALL_TRAINERS,
  USER_SIGN_OUT,
} from "../actions-type/index";

export const initialState = {
  allActivities: [],
  activities: [],
  page: [],
  trainers: [],
  detail: [],
  user: {},
  /* days: [],
  hour: [], */
  isLoading: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_WITH_GOOGLE:
      return {
        ...state,
        user: action.payload,
      };
    case USER_SIGN_OUT:
      return {
        ...state,
        user: null,
      };
    case GET_ALL_TRAINERS:
      return {
        ...state,
        trainers: action.payload,
      };
    case REQUEST_POST:
      return { ...state, isLoading: true };

    case RECEIVED_POST:
      return { ...state, isLoading: false };

    case "GET_ACTIVITY":
      return {
        ...state,
        activities: action.payload,
        allActivities: action.payload,
        page: action.payload.slice(0, 3),
      };

    case "GET_ACTIVITY_DETAIL":
      return {
        ...state,
        detail: action.payload[0],
      };

    case "SEARCH_BY_NAME":
      return {
        ...state,
        activities: state.allActivities.filter(
          (act) => act.name === action.payload.toLowerCase()
        ),
        page: state.allActivities
          .filter(
            (act) => act.name.toLowerCase() === action.payload.toLowerCase()
          )
          .slice(0, 3),
      };

    case "CHANGE_PAGE":
      return {
        ...state,
        page: state.activities.slice(
          (action.payload - 1) * 3,
          action.payload * 3
        ),
      };

    case "FILTER_BY_DAY":
      if (action.payload === "defaultFilter") {
        return {
          ...state,
          activities: state.allActivities,
          page: state.allActivities.slice(0, 3),
        };
      }

      return {
        ...state,
        activities: state.allActivities.filter((act) =>
          act.day.includes(
            action.payload[0].toUpperCase() + action.payload.slice(1)
          )
        ),
        page: state.allActivities
          .filter((act) =>
            act.day.includes(
              action.payload[0].toUpperCase() + action.payload.slice(1)
            )
          )
          .slice(0, 3),
      };

    case "ORDER_ACTIVITIES":
      let orderedActivities = [...state.activities];

      if (action.payload === "defaultOrder") {
        orderedActivities = [...state.activities];
      }

      if (action.payload === "precio") {
        orderedActivities = orderedActivities.sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
          if (a.price > b.price) {
            return 1;
          }
          return 0;
        });
      }

      if (action.payload === "A-Z") {
        orderedActivities = orderedActivities.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      }

      console.log(state.activities);

      return {
        ...state,
        activities: orderedActivities,
        page: orderedActivities.slice(0, 3),
      };

    default:
      return {
        ...state,
      };
  }
};