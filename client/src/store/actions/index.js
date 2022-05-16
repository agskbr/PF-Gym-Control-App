import axios from "axios";
import swal from "sweetalert";
import {
  GET_ALL_TRAINERS,
  RECEIVED_POST,
  REQUEST_POST,
  GET_ALL_USERS,
  GET_ID_USER,
  GET_ALL_DAYS_AND_HOURS,
} from "../actions-type/index";

import { BASE_URL } from "../constantes";

const createActivity = (activity) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/activity`, activity);
      dispatch(getActivity());
      swal({
        buttons: "Aceptar",
        icon: "success",
        timer: 1500,
        title: "Se creó la clase correctamente",
      });
    } catch (error) {
      console.log(error);
      swal({
        buttons: "Aceptar",
        icon: "error",
        timer: 1500,
        title: "Algo salió mal al crear la clase",
      });
    }
  };
};
const createTrainer = (trainer) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/trainer`, trainer);
      dispatch(getAllTrainers());
      swal({
        buttons: "Aceptar",
        icon: "success",
        timer: 1500,
        title: "Se creó al instructor correctamente",
      });
    } catch (error) {
      console.log(error);
      swal({
        buttons: "Aceptar",
        icon: "error",
        timer: 1500,
        title: "Algo salió mal al crear instructor",
      });
    }
  };
};

const editTrainer = (trainer, trainersIds, activityId) => {
  return async (dispatch) => {
    await axios.put(`${BASE_URL}/trainer/${trainer.id}`, trainer);
    trainersIds.forEach((trainerId) => {
      dispatch(addTrainerToActivity(trainerId, activityId));
    });
  };
};

const createDayAndHour = (dayHour) => {
  return async (dispatch) => {
    try {
      await axios.post(`${BASE_URL}/diahora/create`, dayHour);
      dispatch(getAllDaysAndHours());
      swal({
        title: "Se creó el día y horario correctamente",
        buttons: "Aceptar",
        icon: "success",
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Algo salió mal al crear día y horario",
        buttons: "Aceptar",
        icon: "error",
        timer: 1500,
      });
    }
  };
};

const getAllDaysAndHours = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/diahora`);
      dispatch({ type: GET_ALL_DAYS_AND_HOURS, payload: data });
      dispatch({ type: RECEIVED_POST });
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
      dispatch({ type: RECEIVED_POST });
    } catch (error) {
      console.log(error);
    }
  };
};

const getIdUser = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/user/${uid}`);
      dispatch({ type: GET_ID_USER, payload: data });
    } catch (err) {
      console.log(err);
    }
  };
};

const editActivity = (activity, id, dayHourIds, trainersIds) => {
  return async () => {
    try {
      await axios.put(`${BASE_URL}/activity/${id}`, activity);
      await dayHourIds.forEach((dayHourId) => {
        if (dayHourId !== null) {
          axios.post(`${BASE_URL}/diahora/activity`, {
            activityId: id,
            diaHoraId: dayHourId,
          });
        }
      });
      await trainersIds.forEach((trainerId) => {
        if (trainerId !== null) {
          axios.post(`${BASE_URL}/activity/${id}/addTrainer/${trainerId}`);
        }
      });
      swal({
        title: "Actividad editada correctamente",
        buttons: "Aceptar",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      swal({
        title: "Algo salió mal al editar la actividad",
        buttons: "Aceptar",
        icon: "error",
      });
    }
  };
};

const addTrainerToActivity = (trainerId, activityId) => {
  return async () => {
    try {
      await axios.post(
        `${BASE_URL}/activity/${activityId}/addTrainer/${trainerId}`
      );
    } catch (error) {
      console.log(error);
    }
  };
};
const deleteTrainerFromActivity = (trainerId, activityId) => {
  return async () => {
    try {
      await axios.delete(
        `${BASE_URL}/activity/${activityId}/deleteTrainer/${trainerId}`
      );
    } catch (error) {
      console.log(error);
    }
  };
};

const deleteDayHourFromActivity = (activityId, dayHourId) => {
  return async () => {
    try {
      await axios.delete(
        `${BASE_URL}/diahora/activity/${activityId}/${dayHourId}`
      );
    } catch (error) {
      console.log(error);
      swal({
        title: "No se pudo borrar este día-hora de la actividad",
        icon: "error",
        buttons: "Aceptar",
      });
    }
  };
};

const getAllTrainers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/trainer`);
      dispatch({ type: GET_ALL_TRAINERS, payload: data });
      dispatch({ type: RECEIVED_POST });
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
  return function(dispatch) {
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
  return async function(dispatch) {
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
  return function(dispatch) {
    dispatch({
      type: "GET_TIME_BY_ACTIVITY_DAY",
      payload: payload,
    });
  };
}

export function searchByName(name) {
  return function(dispatch) {
    dispatch({
      type: "SEARCH_BY_NAME",
      payload: name,
    });
  };
}

export function filterByDay(filterBy) {
  return function(dispatch) {
    console.log("action");
    dispatch({
      type: "FILTER_BY_DAY",
      payload: filterBy,
    });
  };
}
//
export function orderActivities(orderBy) {
  return function(dispatch) {
    console.log("action");
    dispatch({
      type: "ORDER_ACTIVITIES",
      payload: orderBy,
    });
  };
}

export function changePage(page) {
  console.log("action");
  return function(dispatch) {
    dispatch({
      type: "CHANGE_PAGE",
      payload: page,
    });
  };
}

export {
  createActivity,
  createTrainer,
  getAllTrainers,
  editActivity,
  requestPost,
  getAllUsers,
  getIdUser,
  getAllDaysAndHours,
  createDayAndHour,
  deleteDayHourFromActivity,
  addTrainerToActivity,
  deleteTrainerFromActivity,
  editTrainer,
};
