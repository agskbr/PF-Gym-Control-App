import axios from 'axios';
import {GET_USER_BY_EMAIL, CREATE_USER, GET_USERS, GET_USER_BY_UID, EDIT_USER} from '../actions-type/index';
import {BASE_URL} from '../constantes';

const  getUsers = () => {
    return async function (dispatch){
        try {
            const {data} = await axios.get(`${BASE_URL}/user`)
            return dispatch({
                type: GET_USERS,
                payload: data
            })
        } catch (error) {
            console.log("getUsers", error)
        }
    }
}
const getUserByEmail = (email)=> {
    return async function (dispatch){
      try {
        const {data} = await axios.get(`${BASE_URL}/user/email/`, email)
        return dispatch({
          type: GET_USER_BY_EMAIL,
          payload:data
        })
      } catch (error) {
        console.log("getUserByEmail", error)
      }
    }
}

const getUserById = (id)=> {
    return async function (dispatch){
        try {
            const {data} = await axios.get(`${BASE_URL}/user/${id}`)
            return dispatch ({
                type: GET_USER_BY_UID,
                payload: data
            })
        } catch (error) {
            
        }
    }
}

const createNewUser = (payload)=> {
    return async function (){
        try {
            const newUser = await axios.post(`${BASE_URL}/user`, payload)
            return newUser
        } catch (error) {
            console.log("createNewUser", error)
        }
    }
}

const editUser = (id, data) => {
    return async function (){
        try {
            const {data} = await axios.put(`${BASE_URL}/user/${id}`, data)
            return ({
                type:EDIT_USER,
                payload: data
            })
        } catch (error) {
            console.log("editUser", error)
        }
    }
}

export{
    getUsers,
    getUserByEmail,
    getUserById,
    createNewUser,
    editUser,
}