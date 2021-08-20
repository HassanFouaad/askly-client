import {
  GET_POSTS,
  GET_POST_FAIL,
  GET_POST_LOADING,
  GET_SINGLE_POST,
} from "../actions/types";

const initialState = {
  thisPage: 1,
  allPages: 1,
  count: 1,
  posts: [],
  singlePost: {},
  error: false,
  loading: false,
};

export default function postsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        ...state,
        posts: payload.result,
        thisPage: payload.thisPage,
        allPages: payload.allPages,
        error: false,
        loading: false,
      };
    case GET_POST_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_POST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
