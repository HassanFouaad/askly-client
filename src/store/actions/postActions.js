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

export const createPost = (data) => (dispatch, getState) => {
  dispatch({
    type: GET_POST_LOADING,
  });
  return axios
    .post(apis.post, data, {
      ...tokenConfig(getState),
    })
    .then((res) => {
      const {
        data: { data },
      } = res;

      let posts = getState().posts?.posts;
      let thisPage = getState().posts?.thisPage;
      let allPages = getState().posts?.allPages;
      data.liked = false;
      data.likesCount = 0;
      let newPosts = [data, ...posts];

      dispatch({
        type: GET_POSTS,
        payload: {
          result: newPosts,
          thisPage,
          allPages,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const deletePost = (postId) => (dispatch, getState) => {
  dispatch({
    type: GET_POST_LOADING,
  });
  return axios
    .delete(apis.post, {
      ...tokenConfig(getState),
      params: { postId },
    })
    .then((res) => {
      const {
        data: { data },
      } = res;

      let posts = getState().posts?.posts;
      let thisPage = getState().posts?.thisPage;
      let allPages = getState().posts?.allPages;
      let newPosts = posts.filter((p) => p.id !== postId);

      dispatch({
        type: GET_POSTS,
        payload: {
          result: newPosts,
          thisPage,
          allPages,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const likePost = (postId) => (dispatch, getState) => {
  try {
    let posts = getState().posts?.posts;
    let thisPage = getState().posts?.thisPage;
    let allPages = getState().posts?.allPages;
    let objIndex = posts.findIndex((obj) => obj.id == postId);
    posts[objIndex].liked = !posts[objIndex].liked;
    posts[objIndex].liked == true
      ? (posts[objIndex].likesCount = parseInt(posts[objIndex].likesCount) + 1)
      : (posts[objIndex].likesCount = parseInt(posts[objIndex].likesCount) - 1);
    dispatch({
      type: GET_POSTS,
      payload: {
        result: posts,
        thisPage,
        allPages,
      },
    });

    return axios
      .put(
        apis.postLike,
        { postId },
        {
          ...tokenConfig(getState),
        }
      )
      .then((res) => {
        const {
          data: { data },
        } = res;
      })
      .catch((err) => {
        console.log(err);

        return err;
      });
  } catch (error) {
    console.error(error);
  }
};
