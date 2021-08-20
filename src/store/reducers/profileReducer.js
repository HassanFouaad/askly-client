import {
  GET_PROFILE,
  GET_PROFILE_FAIL,
  GET_PROFILE_LOADING,
} from "../actions/types";

const initialState = {
  profile: null,
  error: false,
  loading: false,
};

export default function profileReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        error: false,
        loading: false,
      };
    case GET_PROFILE_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_PROFILE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
