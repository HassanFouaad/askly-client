import React from "react";
import { connect } from "react-redux";
import {
  RiQuestionnaireFill,
  RiHome2Fill,
  RiUser2Fill,
  RiMessage2Fill,
  RiLogoutBoxFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import { logout } from "../../store/actions/authActions";
import { Navbar, Nav, NavItem, NavbarBrand, NavLink } from "reactstrap";
import MainLogo from "../../Assets/logo.png";
export const NavbarComponent = ({ user, logout }) => {
  return (
    <div>
      <Navbar className="navBar fixed-top">
        <NavbarBrand className="mx-auto mx-md-2" tag={Link} to="/">
          <img src={MainLogo} height="50px" />
        </NavbarBrand>
        <Nav className="mx-auto mx-md-2">
          {user && (
            <>
              <NavItem key="1" className="navItem mx-2">
                <NavLink tag={Link} to="/">
                  <RiHome2Fill size="25" />
                </NavLink>
              </NavItem>
              <NavItem className="navItem mx-2">
                <NavLink tag={Link} to="/questions">
                  <RiQuestionnaireFill size="25" />
                </NavLink>
              </NavItem>
              <NavItem className="navItem">
                <NavLink tag={Link} to={`/chat`}>
                  <RiMessage2Fill size="25" />{" "}
                </NavLink>
              </NavItem>
              <NavItem className="navItem">
                <NavLink tag={Link} to={`/profile/${user?.username}`}>
                  <RiUser2Fill size="25" />
                </NavLink>
              </NavItem>{" "}
            </>
          )}
          <NavLink className="navItem" tag={Link} onClick={() => logout()}>
            <RiLogoutBoxFill size="25" />
          </NavLink>
        </Nav>
      </Navbar>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = { logout };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
