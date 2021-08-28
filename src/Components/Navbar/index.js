import React from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import {
  RiQuestionnaireFill,
  RiHome2Fill,
  RiUser2Fill,
  RiMessage2Fill,
  RiLogoutBoxFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
export const Navbar = ({ user, logout }) => {
  return (
    <div>
      {user && (
        <Menu theme="dark" mode="horizontal" className="navBar">
          <Menu.Item key="1" className="navItem mx-2">
            <Link to="/">
              <RiHome2Fill size="25" />
            </Link>
          </Menu.Item>
          <Menu.Item key="2" className="navItem mx-2">
            <Link to="/questions">
              <RiQuestionnaireFill size="25" />
            </Link>
          </Menu.Item>
          <Menu.Item key="3" className="navItem" style={{ marginLeft: "auto" }}>
            <Link to={`/chat`}>
              <RiMessage2Fill size="25" />{" "}
            </Link>
          </Menu.Item>
          <Menu.Item key="4" className="navItem">
            <Link to={`/profile/${user?.username}`}>
              <RiUser2Fill size="25" />
            </Link>
          </Menu.Item>
          <Menu.Item className="navItem" onClick={() => logout()} >
            <RiLogoutBoxFill size="25" />
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
