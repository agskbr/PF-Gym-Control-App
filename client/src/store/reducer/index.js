import { REQUEST_POST, RECEIVED_POST } from "../actions-type/index";

const initialState = {
  activities: [{
    id: 1,
    name: 'futbol',
    description: '11 vs 11',
    video: '',
    image: '', 
    price: 5,
    day: ['lunes', 'miercoles', 'viernes'],
    hour: ['8-10', '14-16'],
    capacity: 22
  },
  {
    id: 2,
    name: 'basket',
    description: '5 vs 5',
    video: '',
    image: '', 
    price: 10,
    day: ['martes', 'jueves'],
    hour: ['10-12'],
    capacity: 10
  },
  {
    id: 3,
    name: 'pesas',
    description: 'pesas olimpicas',
    video: '',
    image: '', 
    price: 12,
    day: ['lunes', 'martes', 'miercoles', 'jueves', 'viernes'],
    hour: ["8-10","10-12","12-14","14-16","16-18","18-20"],
    capacity: 20
  },
  {
    id: 4,
    name: 'bicicleta',
    description: 'estatica, con rutinas personalizadas',
    video: '',
    image: '', 
    price: 20,
    day: ['lunes', 'miercoles', 'viernes'],
    hour: ["8-10","10-12","12-14"],
    capacity: 30
  }
], 
  orderedActivities: [],
  currentPage: [],
  isLoading: false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POST:
      return { ...state, isLoading: true };

    case RECEIVED_POST:
      return { ...state, isLoading: false };

    case 'GET_ACTIVITIES':
      return {
        ...state, 
        orderedClasses: state.activities,
        currentPage: state.activities
      }
    case "SEARCH_BY_NAME":
        return {
          ...state,
          currentPage: state.activities.filter(act => act.name === action.payload)
        }
      
    case 'FILTER_ACTIVITIES':
        return {
          ...state,
          currentPage: action.payload === 'defaultFilter' ? state.activities : state.activities.filter(act => act.day.includes(action.payload))
          }

    case 'ORDER_ACTIVITIES':
          return {
            ...state,
            orderedClasses: action.payload,
            currentPage: state.orderedClasses
          }

    default:
      return {
        ...state,
      };
  }
};

export { rootReducer };
