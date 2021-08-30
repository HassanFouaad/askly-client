import React from "react";
import { connect } from "react-redux";

export const Loader = ({ isActive }) => {
  return <div className="loader"></div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Loader);
