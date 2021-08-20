import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth && auth.token ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/login"></Redirect>
        )
      }
    ></Route>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);
