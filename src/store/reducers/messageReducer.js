import {
  GET_MESSAGES,
  GET_MESSAGES_FAIL,
  GET_MESSAGES_LOADING,
} from "../actions/types";

const initialState = {
  messages: [],
  error: false,
  loading: false,
  thisPage: 1,
  allPages: 1,
  totalCount: 1,
  chat: null,
};

export default function messageReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload.result,
        thisPage: payload.thisPage,
        allPages: payload.allPages,
        error: false,
        loading: false,
        chat: payload.chat,
      };
    case GET_MESSAGES_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
