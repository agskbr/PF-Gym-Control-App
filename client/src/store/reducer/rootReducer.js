import {
  REQUEST_POST,
  RECEIVED_POST,
  GET_ALL_TRAINERS,
  GET_ALL_USERS,
  GET_ID_USER,
  GET_ALL_ORDERS,
  GET_ALL_DAYS_AND_HOURS,
  GET_ORDERLINE_BY_ORDER_ID,
  GET_ALL_ORDERS_BY_USER,
  SET_ORDER_STATUS,
  SET_COUNT_CLICK
} from "../actions-type/index";

export const initialState = {
  allActivities: [],
  activities: [],
  users: [],
  page: [],
  trainers: [],
  detail: [],
  orders: [],
  daysAndHours: [],
  userId: [],
  orderlines: [],
  orderStatus: [],
  countClick:0,
  disable:false,
  isLoading: false,
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COUNT_CLICK:
      let contador = action.payload
      if(contador >= 9){
        return {
          ...state,
          disable:true,
          countClick: action.payload
        }
      }else{
        return {
            ...state,
            countClick: action.payload,
            disable:false
        }
      }
    case SET_ORDER_STATUS:
      console.log(action.payload)
      return {
        ...state,
        orderStatus: action.payload,
      }
    case GET_ALL_TRAINERS:
      return {
        ...state,
        trainers: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case GET_ALL_DAYS_AND_HOURS:
      return { ...state, daysAndHours: action.payload };
    case GET_ALL_ORDERS:
      return { ...state, orders: action.payload };

    case GET_ID_USER:
      return {
        ...state,
        userId: action.payload,
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
        detail: action.payload,
      };

    /*  case "GET_TIME_BY_ACTIVITY_DAY":
       state.pgym.detail.diaHoras.filter((item) => {
          if (item.day === action.payload.day) {
      return {
        ...state,
        time: item.hour,
      };
    }
  });
 */
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

    case GET_ALL_ORDERS_BY_USER:
      return {
        ...state,
        orders: action.payload
      }
    case GET_ORDERLINE_BY_ORDER_ID:
      return {
        ...state,
        orderlines: action.payload,
      }
      
    default:
      return {
        ...state,
      };
  }
};
