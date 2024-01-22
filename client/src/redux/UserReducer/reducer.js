import { GET_USERS_ERROR, GET_USERS_REQUEST, GET_USERS_SUCCESS } from "../actionTypes"


const initialState = {
    users : [],
    isLoading: false,
    isError: false
}

export const reducer = (state= initialState, { type, payload }) =>{
    switch (type) {
        case GET_USERS_REQUEST:
            return {...state, isLoading: true}

        case GET_USERS_SUCCESS:
            return {...state, isLoading: false, isError: false, users: payload}    

        case GET_USERS_ERROR:
            return {...state, isError: true}

        default:
            return state;
    }
}