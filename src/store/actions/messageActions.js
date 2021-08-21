import axios from "axios";

import { apis } from "../../connection/Apis/Chat";
import { GET_MESSAGES, GET_MESSAGES_FAIL, GET_MESSAGES_LOADING } from "./types";

import { tokenConfig } from "./authActions";

export const getChatMessages =
  (query, page, notState) => (dispatch, getState) => {
    dispatch({
      type: GET_MESSAGES_LOADING,
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
          data: {
            data: { chat, messages: data },
          },
        } = res;

        let messages = getState().messages?.messages;

        let newMessages =
          page === 1 ? data.result : [...messages, ...data.result];

        newMessages = newMessages.sort(function (a, b) {
          var c = new Date(a.createdAt);
          var d = new Date(b.createdAt);
          return c - d;
        });

        dispatch({
          type: GET_MESSAGES,
          payload: {
            result: newMessages,
            thisPage: data.thisPage,
            allPages: data.allPages,
            chat: chat,
          },
        });

        return data;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  };

export const sendNewMessage = (data) => (dispatch, getState) => {
  let socket = getState().socket.socket;
  console.log(socket.emit);
  if (!socket) return console.log("Error while socketing", socket);

  socket.emit("newMessage", data);
};

export const newMessageSent = (data) => (dispatch, getState) => {
  try {
    let messages = getState().messages?.messages;
    let thisPage = getState().messages?.thisPage;
    let allPages = getState().messages?.allPages;
    let chat = getState().messages?.chat;

    if (messages) {
      let newMessage = data.message;
      let newMessages = [...messages, newMessage];
      newMessages = newMessages.sort(function (a, b) {
        var c = new Date(a.createdAt);
        var d = new Date(b.createdAt);
        return c - d;
      });

      dispatch({
        type: GET_MESSAGES,
        payload: {
          result: newMessages,
          thisPage,
          allPages,
          chat: chat,
        },
      });

      let objDiv = document.getElementById("messageContainer");
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
