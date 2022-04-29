// import {} from "../actions-type/index";

export function getActivities(activities) {
    return function(dispatch) {
        dispatch({
            type: 'GET_ACTIVITIES',
            payload: activities
        })
    }
}

export function searchByName(name) {
    return function(dispatch) {
        dispatch({
            type: 'SEARCH_BY_NAME',
            payload: name
        })
    }
}

export function filter(filterBy) {
    return function(dispatch) {
        console.log('action')
        dispatch({
            type: 'FILTER_ACTIVITIES', 
            payload: filterBy,
        })
    }
}