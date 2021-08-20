import axios from "axios";

import { apis } from "../../connection/Apis/Profile";
import {
  GET_PROFILE,
  GET_PROFILE_LOADING,
  GET_PROFILE_FAIL,
  USER_LOADED,
} from "./types";
import { tokenConfig } from "./authActions";

export const getProfile = (query) => (dispatch, getState) => {
  dispatch({
    type: GET_PROFILE_LOADING,
  });
  return axios
    .get(apis.profile, {
      ...tokenConfig(getState),
      params: {
        ...query,
      },
    })
    .then((res) => {
      const {
        data: { data },
      } = res;

      dispatch({
        type: GET_PROFILE,
        payload: data,
      });

      let user = getState().auth?.user;
      if (user) {
        if (user.id === data.id) {
          localStorage.setItem("user", JSON.stringify({ ...user, ...data }));
          return dispatch({
            type: USER_LOADED,
            payload: { token: getState().auth?.token, user: data },
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_PROFILE_FAIL });
      return err;
    });
};
