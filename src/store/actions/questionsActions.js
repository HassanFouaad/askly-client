import axios from "axios";

import { apis } from "../../connection/Apis/Question";
import {
  QUESTIONS_FAIL,
  QUESTIONS_LOADING,
  LOAD_QUESTIONS,
  GET_SENT_QUESTIONS,
} from "./types";
import { notification } from "antd";
import { tokenConfig } from "./authActions";

export const getQuestions = (query, page, notState) => (dispatch, getState) => {
  dispatch({
    type: QUESTIONS_LOADING,
  });
  return axios
    .get(apis.question, {
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

      let questions = getState().questions?.questions;

      let newQuestions =
        page === 1 ? data.result : [...questions, ...data.result];

      if (!notState) {
        dispatch({
          type: LOAD_QUESTIONS,
          payload: {
            result: newQuestions,
            thisPage: data.thisPage,
            allPages: data.allPages,
          },
        });
      }

      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
export const answerQuestion = (data) => (dispatch, getState) => {
  return axios
    .post(apis.question + "/answer", data, {
      ...tokenConfig(getState),
    })
    .then((res) => {
      const {
        data: { data, message },
      } = res;
      let thisPage = getState().questions?.thisPage;
      let allPages = getState().questions?.allPages;
      let questions = getState().questions?.questions?.filter(
        (q) => q.id != data.id
      );
      dispatch({
        type: LOAD_QUESTIONS,
        payload: {
          result: questions,
          thisPage: thisPage,
          allPages: allPages,
        },
      });
      notification.success({ message: message });

      return data;
    })
    .catch((error) => {
      console.log(error);
      if (error.response?.data) {
        if (error.response?.data.error.inputErrors) {
        } else {
          notification.error({ message: error?.response.data.error.message });
        }
      }
    });
};

export const askQuestion = (data, setModal) => (dispatch, getState) => {
  return axios
    .post(apis.question, data, {
      ...tokenConfig(getState),
    })
    .then((res) => {
      const {
        data: { data, message },
      } = res;
      notification.success({ message: message });
      setModal(false);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

export const getSentQuestions =
  (query, page, notState) => (dispatch, getState) => {
    return axios
      .get(apis.question + "/sent", {
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

        let questions = getState().questions?.questions;

        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };
