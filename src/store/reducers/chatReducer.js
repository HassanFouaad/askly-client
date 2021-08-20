import {
  GET_CHATS,
  GET_CHATS_LOADING,
  GET_SINGLE_POST,
} from "../actions/types";

const initialState = {
  chats: [],
  error: false,
  loading: false,
  thisPage: 1,
  allPages: 1,
  totalCount: 1,
};

export default function chatReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_CHATS:
      return {
        ...state,
        chats: payload.result,
        thisPage: payload.thisPage,
        allPages: payload.allPages,
        error: false,
        loading: false,
      };
    case GET_CHATS_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_SINGLE_POST:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
