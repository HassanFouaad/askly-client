import {
  SOCKET_CONNECT,
  SOCKET_CONNECT_LOADING,
  SOCKET_CONNECT_FAILED,
} from "./types";

import { notification } from "antd";
import { tokenConfig } from "./authActions";

const io = require("socket.io-client");

export const connectToSocket = () => (disaptch, getState) => {
  try {
    const socket = io.connect("ws://localhost:7500", {
      query: { token: tokenConfig(getState).headers["Authorization"] },
    });
    socket.on("connect", () => {
      console.log("Socket server connected");
      disaptch({ type: SOCKET_CONNECT, payload: socket });
    });
  } catch (error) {
    console.log(error);
  }
};
