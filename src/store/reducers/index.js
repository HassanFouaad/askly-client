import { combineReducers } from "redux";
import auth from "./authReducer";
import profile from "./profileReducer";
import questions from "./questionsReducer";
import posts from "./postReducer";
import socket from "./socketReducer";
import chat from "./chatReducer";
export default combineReducers({
  auth,
  questions,
  profile,
  posts,
  socket,
  chat,
});
