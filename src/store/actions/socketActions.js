import {
  SOCKET_CONNECT,
  SOCKET_CONNECT_LOADING,
  SOCKET_CONNECT_FAILED,
} from "./types";

import { notification } from "antd";
import { tokenConfig } from "./authActions";
import { newMessageSent } from "./messageActions";

const io = require("socket.io-client");

export const connectToSocket = () => (dispatch, getState) => {
  try {
    const socket = io.connect("app-5471f928-0f92-4436-8f48-e9fedb3d6cfa.cleverapps.io", {
      query: { token: tokenConfig(getState).headers["Authorization"] },
    });
    socket.on("connect", () => {
      dispatch({ type: SOCKET_CONNECT, payload: socket });

      socket.on("newMessageDone", (data) => {
        dispatch(newMessageSent(data));
      });

      socket.on("newMessage", (data) => {
        dispatch(newMessageSent(data));
      });
    });
  } catch (error) {
    console.log(error);
  }
};
