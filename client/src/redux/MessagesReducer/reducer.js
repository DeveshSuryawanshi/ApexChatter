import { GET_MESSAGES_SUCCESS, MESSAGES_ERROR, MESSAGES_REQUEST, POST_MESSAGES_SUCCESS } from "../actionTypes";

const initialState = {
    messages : [],
    isLoading: false,
    isError: false
}

export const reducer = (state= initialState, {type, payload}) => {
    switch (type) {
        case MESSAGES_REQUEST:
            return {...state, isLoading: true};
         
        case GET_MESSAGES_SUCCESS:
            return {...state, isLoading: false, messages: payload};
            
        case POST_MESSAGES_SUCCESS:
            return {...state, isLoading: false,};
        
        case MESSAGES_ERROR:
            return {...state, isError: true};    
            
        default:
            return state;
    }  
}