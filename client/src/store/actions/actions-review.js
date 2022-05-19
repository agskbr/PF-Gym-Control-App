import axios from 'axios';
import {CREATE_REVIEW, GET_ALL_REVIEWS, GET_REVIEWS_BY_USER} from '../actions-type/index';
import {BASE_URL} from '../constantes'




export const postReview = (payload)=>{ // review = description, rating, userId, img??
    return async (dispatch)=> {
        try {
            console.log(payload)
            const { data } = await axios.put(`${BASE_URL}/review/activity`, payload)
            console.log(data)
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
            const {data} = await axios.get(`${BASE_URL}/review/all`)
            return dispatch({
                type: GET_ALL_REVIEWS,
                payload: data
            })
        } catch (err) {
            console.log('error en getAllReviews', err)
        }
    }
}

export const getReviewsByUser = (id) => {
    return async (dispatch)=>{
        try {
            const {data} = await axios.get(`${BASE_URL}/review/user/${id}`)
            return dispatch({
                type: GET_REVIEWS_BY_USER,
                payload:data
            })
        } catch (error) {
            console.log('error en getReviewsByUser', error)
        }
    }
}