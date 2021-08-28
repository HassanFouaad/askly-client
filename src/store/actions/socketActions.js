import {
  SOCKET_CONNECT,
  SOCKET_CONNECT_LOADING,
  SOCKET_CONNECT_FAILED,
} from "./types";

import { tokenConfig } from "./authActions";
import { newMessageSent } from "./messageActions";

const io = require("socket.io-client");

export const connectToSocket = () => (dispatch, getState) => {
  try {
    let isConnected = getState().socket?.socket;
    if (isConnected) return
    const socket = io.connect(
      "app-5471f928-0f92-4436-8f48-e9fedb3d6cfa.cleverapps.io",
      {
        query: { token: getState().auth.token },
        transports: ["websocket"],
      }
    );
    socket.on("connect", () => {
      dispatch({ type: SOCKET_CONNECT, payload: socket });

      socket.on("newMessageDone", (data) => {
        dispatch(newMessageSent(data));
        //    return socket.off('newMessageDone')
      });

      socket.on("newMessage", (data) => {
        console.log(data);
        dispatch(newMessageSent(data));
      });
    });
  } catch (error) {
    console.log(error);
  }
};
