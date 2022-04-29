import axios from "axios";
// import {} from "../actions-type/index";

const createActivity = (activity) => {
  return async () => {
    try {
      await axios.post("http://localhost:3001/activity", activity);
    } catch (error) {
      console.log(error);
    }
  };
};

export { createActivity };
