import {
  QUESTIONS_FAIL,
  QUESTIONS_LOADING,
  LOAD_QUESTIONS,
} from "../actions/types";

const initialState = {
  questions: [],
  error: false,
  loading: false,
  thisPage: 1,
  allPages: 1,
  totalCount: 1,
};

export default function questionsReducer(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOAD_QUESTIONS:
      return {
        ...state,
        questions: payload.result,
        thisPage: payload.thisPage,
        allPages: payload.allPages,
        error: false,
        loading: false,
      };
    case QUESTIONS_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case QUESTIONS_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
