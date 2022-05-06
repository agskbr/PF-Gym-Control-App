import axios from 'axios';
import {CREATE_REVIEW, GET_ALL_REVIEWS,} from '../actions-type/index';

const base_url = "http://localhost:3001";

export const postReview = (review)=>{ // review = description, rating, userId, img??
    return async (dispatch)=> {
        try {
            const {data} = await axios.post(`${base_url}/Review/activity`, review)
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
            const {data} = await axios.get(`${base_url}/reviews`)
            return dispatch({
                type: GET_ALL_REVIEWS,
                payload: data
            })
        } catch (err) {
            console.log('error en getAllReviews', err)
        }
    }
}