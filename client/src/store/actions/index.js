import axios from "axios";
import {
  GET_ALL_TRAINERS,
  RECEIVED_POST,
  REQUEST_POST,
} from "../actions-type/index";

const base_url = "https://pfgymapp-2.herokuapp.com";

const createActivity = (activity) => {
  return async () => {
    try {
      await axios.post(`${base_url}/activity`, activity);
    } catch (error) {
      console.log(error);
    }
  };
};

const editActivity = (activity, id) => {
  return async () => {
    try {
      await axios.put(`${base_url}/activity/${id}`, activity);
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllTrainers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${base_url}/trainer`);
      dispatch({ type: GET_ALL_TRAINERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};
const requestPost = () => {
  return {
    type: REQUEST_POST,
  };
};

export function getActivity() {
  return function (dispatch) {
    axios
      .get(`${base_url}/activity`)
      .then((activity) =>
        dispatch({
          type: "GET_ACTIVITY",
          payload: activity.data,
        })
      )
      .then(() => {
        dispatch({ type: RECEIVED_POST });
      })
      .catch((err) => console.log(err));
  };
}

/* export function getDays() {
	return async function (dispatch) {
		const days = await axios.get(`${base_url}/days`);
		dispatch({
			days: 'GET_DAYS',
			payload: days.data,
		});
	};
}

export function getHour() {
	return async function (dispatch) {
		const hour = await axios.get(`${base_url}/hour`);
		dispatch({
			hour: 'GET_HOUR',
			payload: hour.data,
		});
	};
} */

export function getActivityById(payload) {
  return async function (dispatch) {
    try {
      const activity = await axios.get(`${base_url}/activity/` + payload);
      dispatch({
        type: "GET_ACTIVITY_DETAIL",
        payload: activity.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function searchByName(name) {
  return function (dispatch) {
    dispatch({
      type: "SEARCH_BY_NAME",
      payload: name,
    });
  };
}

export function filterByDay(filterBy) {
  return function (dispatch) {
    console.log("action");
    dispatch({
      type: "FILTER_BY_DAY",
      payload: filterBy,
    });
  };
}
//
export function orderActivities(orderBy) {
  return function (dispatch) {
    console.log("action");
    dispatch({
      type: "ORDER_ACTIVITIES",
      payload: orderBy,
    });
  };
}

export function changePage(page) {
  console.log("action");
  return function (dispatch) {
    dispatch({
      type: "CHANGE_PAGE",
      payload: page,
    });
  };
}

export { createActivity, getAllTrainers, editActivity, requestPost };
