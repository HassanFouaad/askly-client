import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
  SOCKET_CONNECT_FAILED,
  REGISTER_SUCCESS,
  /*  REGISTER_FAIL, */
} from "./types";
import axios from "axios";
import { userAPIS as apis } from "../../connection/Apis/User";
import { connectToSocket } from "./socketActions";

export const userLodaing = () => ({
  type: USER_LOADING,
});

export const tokenConfig = (getState) => {
  //Get token from Local Storage
  let token = getState().auth.token;
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  if (token) {
    config.headers["Authorization"] = token;
    config.headers["accept-language"] = "en";
  }
  return config;
};

export const loadUser = () => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });

  let token = localStorage.getItem("token") || getState().auth?.token;
  let user = localStorage.getItem("user") || getState().auth?.user;
  if (token) {
    return dispatch({
      type: USER_LOADED,
      payload: { token: token, user: JSON.parse(user) },
    });
  } else {
    return dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (dataForLogin) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  if (dataForLogin.deviceToken) {
    if (dataForLogin.deviceToken.length === 0) {
      delete dataForLogin.deviceToken;
    }
  } else {
    delete dataForLogin.deviceToken;
  }
  axios
    .post(apis.signin, dataForLogin, config)
    .then((res) => {
      const user = res.data.data.user;
      const token = res.data.data.token;
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user, token },
      }); /*  toastr.success("Welcome Back!", "You have successfully logged in"); */
    })
    .catch((error) => {
      let payload = {};
      if (error.response?.data) {
        if (error.response.data.error.inputErrors) {
          payload.inputErrors = error.response.data.error.inputErrors;
        } else {
          payload.error = error.response.data.error.message;
        }
      }
      dispatch({
        type: LOGIN_FAIL,
        payload,
      });
    });
};

export const signup = (dataforregister, push) => (dispatch) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  axios
    .post(apis.signup, dataforregister, config)
    .then((res) => {
      push?.push("/login");
      dispatch({ type: REGISTER_SUCCESS });
      /*  toastr.success("Welcome Back!", "You have successfully logged in"); */
    })
    .catch((error) => {
      let payload = {};
      if (error.response?.data) {
        if (error?.response?.data?.error?.inputErrors) {
          payload.inputErrors = error.response.data.error.inputErrors;
        } else {
          payload.error = error.response?.data?.error?.message;
        }
      }
      dispatch({
        type: LOGIN_FAIL,
        payload,
      });
    });
};

export const logout = (message) => (dispatch, getState) => {
  try {
    if (!message) {
      /*    toastr.success("See you later", "You have successfully logged out"); */
    }
    let socket = getState().socket?.socket;
    socket?.disconnect();
    socket.close();
    dispatch({
      type: SOCKET_CONNECT_FAILED,
    });
    return dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateProfile = (data) => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING,
  });
  const url = apis.profile;
  axios
    .put(url, data, tokenConfig(getState))
    .then((res) => {
      const {
        data: { data, message },
      } = res;

      let user = getState().auth.user;
      user = { ...user, ...data };
      let token = localStorage.getItem("token");
      return dispatch({
        type: USER_LOADED,
        payload: { token: token, user },
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
