import axios from "axios";
import {
  GET_ALL_TRAINERS,
  RECEIVED_POST,
  REQUEST_POST,
  GET_ALL_USERS,
} from "../actions-type/index";

import { BASE_URL } from "../constantes";



const createActivity = (activity) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/activity`, activity);
      dispatch(getActivity());
    } catch (error) {
      console.log(error);
    }
  };
};
const createUser = (user) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/user`, user);
      dispatch(getAllUsers());
    } catch (error) {
      console.log(error);
    }
  };
};
const createTrainer = (trainer) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/trainer`, trainer);
      dispatch(getAllTrainers());
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user`);
      dispatch({ type: GET_ALL_USERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

const editActivity = (activity, id) => {
  return async () => {
    try {
      await axios.put(`${BASE_URL}/activity/${id}`, activity);
    } catch (error) {
      console.log(error);
    }
  };
};

const getAllTrainers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/trainer`);
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
      .get(`${BASE_URL}/activity/all`)
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

export function getActivityById(payload) {
  return async function (dispatch) {
    try {
      const activity = await axios.get(`${BASE_URL}/activity/` + payload);
      dispatch({
        type: "GET_ACTIVITY_DETAIL",
        payload: activity.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getTimeByActivityId(payload) {
      return function (dispatch) {
      dispatch({
      type: "GET_TIME_BY_ACTIVITY_DAY",
        payload: payload,
      });
}
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

export {
  createActivity,
  createUser,
  createTrainer,
  getAllTrainers,
  editActivity,
  requestPost,
  getAllUsers,
};
