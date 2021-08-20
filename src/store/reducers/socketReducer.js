import {
  SOCKET_CONNECT,
  SOCKET_CONNECT_LOADING,
  SOCKET_CONNECT_FAILED,
} from "../actions/types";

const initialState = {
  socket: null,
  loading: false,
  error: false,
};

export default function socketReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SOCKET_CONNECT:
      return {
        ...state,
        socket: payload,
        error: false,
        loading: false,
      };
    case SOCKET_CONNECT_LOADING:
      return {
        ...state,
        socket: null,
        error: false,
        loading: true,
      };
    case SOCKET_CONNECT_FAILED:
      return {
        ...state,
        socket: null,
        error: false,
        loading: true,
      };
    default:
      return state;
  }
}
