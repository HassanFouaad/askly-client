import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "./store/store";
import {
  Login,
  Home,
  Questions,
  Profile,
  Chat,
  SingleChat,
  Signup,
} from "./Pages";
import { loadUser } from "./store/actions/authActions";
import { connectToSocket } from "./store/actions/socketActions";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";
import { connect } from "react-redux";

export const Main = ({ token, loading, socket }) => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  React.useEffect(() => {
    if (token && !socket) {
      socket?.disconnect();
      if (!socket?.emit) {
        store.dispatch(connectToSocket());
      }
    }
  }, [token, loading, socket]);

  return (
    <>
      {!loading && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Signup} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/questions" component={Questions} />
            <ProtectedRoute exact path="/chat" component={Chat} />
            <ProtectedRoute exact path="/chat/:chatId" component={SingleChat} />
            <Route exact path="/profile/:username" component={Profile} />
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  token: state?.auth?.token,
  socket: state?.auth?.socket?.socket,
  loading: state?.auth?.isLoading,
});

const mapDispatchToProps = { connectToSocket };

export default connect(mapStateToProps, mapDispatchToProps)(Main);
