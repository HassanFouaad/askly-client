import axios from "axios";

import { apis } from "../../connection/Apis/Chat";
import { GET_CHATS, GET_CHATS_FAIL, GET_CHATS_LOADING } from "./types";
import { notification } from "antd";
import { tokenConfig } from "./authActions";

export const getChats = (query, page, notState) => (dispatch, getState) => {
  dispatch({
    type: GET_CHATS_LOADING,
  });
  return axios
    .get(apis.chat, {
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

      let chats = getState().chat?.chats;

      let newChats =
        page === 1 ? data.result : [...chats, ...data.result];

      dispatch({
        type: GET_CHATS,
        payload: {
          result: newChats,
          thisPage: data.thisPage,
          allPages: data.allPages,
        },
      });

      return data;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};
