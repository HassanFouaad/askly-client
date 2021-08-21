import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { Login, Home, Questions, Profile, Chat, SingleChat } from "./Pages";
import { loadUser } from "./store/actions/authActions";
import ProtectedRoute from "./Components/ProtectedRoute";
import Navbar from "./Components/Navbar";

export default function Main() {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/questions" component={Questions} />
            <ProtectedRoute exact path="/chat" component={Chat} />
            <ProtectedRoute exact path="/chat/:chatId" component={SingleChat} />
            <Route exact path="/profile/:username" component={Profile} />
          </Switch>
        </BrowserRouter>
      </Provider>
    </>
  );
}
