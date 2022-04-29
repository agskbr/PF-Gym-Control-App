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

export { createActivity, getAllTrainers };
