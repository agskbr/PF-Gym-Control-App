import axios from 'axios';
import {CREATE_REVIEW, GET_ALL_REVIEWS,} from '../actions-type/index';

/* const base_url = "http://localhost:3001"; */
const base_url = "https://pfgymapp-2.herokuapp.com";

export const postReview = (payload)=>{ // review = description, rating, userId, img??
    return async (dispatch)=> {
        try {
            const {data} = await axios.post(`${base_url}/review/activity`, payload)
            return dispatch({
                type:CREATE_REVIEW,
                payload:data
            })
        } catch (err) {
            console.log('postReview error', err)
        }
    }
}

export const getAllReviews = ()=> {
    return async (dispatch)=> {
        try {
            const {data} = await axios.get(`${base_url}/review/all`)
            return dispatch({
                type: GET_ALL_REVIEWS,
                payload: data
            })
        } catch (err) {
            console.log('error en getAllReviews', err)
        }
    }
}