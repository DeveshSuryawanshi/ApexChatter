import axios from "axios";
import { GET_MESSAGES_SUCCESS,MESSAGES_ERROR, MESSAGES_REQUEST, POST_MESSAGES_SUCCESS } from "../actionTypes";
import { getMessages, sendMessage } from "../../Api/apis";

export const getAllMessagesData = (data) => (dispatch) =>{
    dispatch({type: MESSAGES_REQUEST});
    axios.post(`${getMessages}`, data) 
     .then((res) =>{
        dispatch({type:GET_MESSAGES_SUCCESS, payload: res.data});
     })
     .catch((error)=>{
        dispatch({type: MESSAGES_ERROR});
     })
}

export const sendUserMessage = (message) => (dispatch) =>{
    dispatch({type: MESSAGES_REQUEST});
    axios.post(`${sendMessage}`, message)
     .then((res) =>{
        dispatch(getAllMessagesData(message));
        dispatch({type: POST_MESSAGES_SUCCESS});
     })
     .catch((error)=>{
        dispatch({type: MESSAGES_ERROR});
     })
}