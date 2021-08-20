import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  USER_LOADED,
  USER_LOADING,
  LOGOUT_SUCCESS,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
  error: false,
  inputErrors: [],
};

export default function store(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload.user,
        token: payload.token,
        error: false,
        inputErrors: [],
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
        error: false,
        inputErrors: [],
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload.user,
        token: action.payload.token,
        error: false,
        inputErrors: [],
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        isNewlyRegged: true,
        user: action.payload,
        error: false,
        inputErrors: [],
      };
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        ...payload,
      };
    default:
      return state;
  }
}
