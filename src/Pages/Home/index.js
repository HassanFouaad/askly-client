import React from "react";
import { connect } from "react-redux";
import Posts from "../../Components/Posts";

export const Home = ({ user }) => {
  return (
    <div className="main-page">
      <Posts />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
