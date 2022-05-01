import axios from "axios";
import { GET_ALL_TRAINERS } from "../actions-type/index";

const base_url = "http://localhost:3001";

const createActivity = (activity) => {
  return async () => {
    try {
      await axios.post(`${base_url}/activity`, activity);
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

export function getActivity() {
  return function (dispatch) {
    axios.get(`${base_url}/activity`).then((activity) =>
      dispatch({
        type: "GET_ACTIVITY",
        payload: activity.data,
      })
    );
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

export function filterByDay(payload) {
  return async function (dispatch) {
    dispatch({
      type: "FILTER_BY_DAY",
      payload,
    });
  };
}

export function filterByHour(payload) {
  return async function (dispatch) {
    dispatch({
      type: "FILTER_BY_HOUR",
      payload,
    });
  };
}

export { createActivity, getAllTrainers };
