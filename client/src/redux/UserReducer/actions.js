import axios from "axios";
import {
  GET_USERS_ERROR,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from "../actionTypes";
import { allContactsApi } from "../../Api/apis";

export const getUsers = (userID) => (dispatch) => {
  dispatch({ type: GET_USERS_REQUEST });
  axios
    .get(`${allContactsApi}/${userID}`)
    .then((res) => {
      dispatch({ type: GET_USERS_SUCCESS, payload: res.data });
    })
    .catch((error) => {
      dispatch({ type: GET_USERS_ERROR });
    });
};
