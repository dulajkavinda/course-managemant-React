import axios from "axios";
import setAuthToken from "../util/setAuthToken";
import jwt_decode from "jwt-decode";

import {
  GET_ERRORS,
  SET_CURRENT_ADMIN,
  SEND_ADMIN_EMAIL,
  FETCH_ADMINS
} from "./types";

// Register

export const registerUser = (userData, history) => dispatch => {
  axios
    .post("http://localhost:3000/api/admin/register ", userData)
    .then(res => {
      history.push("/admin");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get user token

export const loginAdmin = userData => dispatch => {
  axios
    .post("http://localhost:3000/api/admin/login", userData)
    .then(res => {
      // save to local stograge
      const { token } = res.data;
      // set token to ls
      localStorage.setItem("jwtToken", token);
      // set token to auth header
      setAuthToken(token);
      // decode token to get data
      const decode = jwt_decode(token);
      // set current user
      dispatch(setCurrentAdmin(decode));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set Logged in admin
export const setCurrentAdmin = deocded => {
  return {
    type: SET_CURRENT_ADMIN,
    payload: deocded
  };
};

// log user out
export const logoutAdmin = userData => dispatch => {
  // remove token
  localStorage.removeItem("jwtToken");
  //remove auth header
  setAuthToken(false);
  // set admin null
  dispatch(setCurrentAdmin({}));
};

// send email
export const sendEmail = userData => dispatch => {
  axios
    .post("http://localhost:3000/api/sendmail/test", userData)
    .then(email => {
      dispatch({
        type: SEND_ADMIN_EMAIL,
        payload: email
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// fetch admins

export const fetchAdmins = () => dispatch => {
  console.log("fetching action runs for fetchPost");
  fetch("http://localhost:3000/api/admin/all")
    .then(response => response.json())
    .then(admins =>
      dispatch({
        type: FETCH_ADMINS,
        payload: admins
      })
    )
    .catch(err => console.log(err));
};
