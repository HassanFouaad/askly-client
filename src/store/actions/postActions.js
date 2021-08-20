import axios from "axios";

import { apis } from "../../connection/Apis/Post";
import {
  GET_POSTS,
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_SINGLE_POST,
} from "./types";

import { tokenConfig } from "./authActions";

export const getPosts = (query, page, notState) => (dispatch, getState) => {
  dispatch({
    type: GET_POST_LOADING,
  });
  return axios
    .get(apis.post, {
      ...tokenConfig(getState),
      params: {
        ...query,
        limit: query.limit ? query.limit : 30,
        page,
      },
    })
    .then((res) => {
      const {
        data: { data },
      } = res;

      let posts = getState().posts?.posts;

      let newPosts = page === 1 ? data.result : [...posts, ...data.result];

      dispatch({
        type: GET_POSTS,
        payload: {
          result: newPosts,
          thisPage: data.thisPage,
          allPages: data.allPages,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
