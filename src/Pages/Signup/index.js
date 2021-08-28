import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, notification, Row } from "antd";
import { signup } from "../../store/actions/authActions";
import { Link } from "react-router-dom";
import MainLogo from "../../Assets/logo.png";

export const Login = ({
  signup: signupAction,
  error,
  auth,
  history,
  inputErrors,
}) => {
  const onSubmit = (data) => {
    signupAction(data, history);
  };

  React.useEffect(() => {
    if (error) {
      notification.error({
        message: `Login Error`,
        description: error,
        className: "notification-box",
      });
    }

    if (auth.user) {
      history.push("/");
    }
  }, [auth]);

  return (
    <div className="login-page">
      <div className="container text-center">
        <Row
          type="flex"
          justify="center"
          align="middle"
          style={{ minHeight: "100vh" }}
        >
          <Form onFinish={onSubmit} className="login-form text-center">
          <img src={MainLogo} height="120px" />

            <Form.Item
              {...(inputErrors && {
                help: inputErrors
                  ?.find((err) => err?.context?.label == "firstName")
                  ?.message?.toLowerCase()
                  .replace(`"`, "")
                  .replace(`"`, ""),
                validateStatus: "error",
              })}
              name="firstName"
              className="text-center"
              rules={[
                { required: true, message: "Firstname is required" },
                { max: 100, message: "Exceeded maximum character length" },
              ]}
            >
              <Input
                name="firstName"
                placeholder="Firstname"
                className="dark-input"
              />
            </Form.Item>
            <Form.Item
              {...(inputErrors && {
                help: inputErrors
                  ?.find((err) => err?.context?.label == "lastName")
                  ?.message?.toLowerCase()
                  .replace(`"`, "")
                  .replace(`"`, ""),
                validateStatus: "error",
              })}
              name="lastname"
              className="text-center"
              rules={[
                { required: true, message: "Lastname is required" },
                { max: 100, message: "Exceeded maximum character length" },
              ]}
            >
              <Input
                name="lastname"
                placeholder="Lastname"
                className="dark-input"
              />
            </Form.Item>
            <Form.Item
              {...(inputErrors && {
                help: inputErrors
                  ?.find((err) => err?.context?.label == "username")
                  ?.message?.toLowerCase()
                  .replace(`"`, "")
                  .replace(`"`, ""),
                validateStatus: "error",
              })}
              name="username"
              className="text-center"
              rules={[
                { required: true, message: "username is required" },
                { max: 100, message: "Exceeded maximum character length" },
              ]}
            >
              <Input
                name="username"
                placeholder="Username"
                className="dark-input"
              />
            </Form.Item>
            <Form.Item
              {...(inputErrors && {
                help: inputErrors
                  ?.find((err) => err?.context?.label == "mobile")
                  ?.message?.toLowerCase()
                  .replace(`"`, "")
                  .replace(`"`, ""),
                validateStatus: "error",
              })}
              name="mobile"
              className="text-center"
              rules={[
                { required: true, message: "mobile is required" },
                { max: 100, message: "Exceeded maximum character length" },
              ]}
            >
              <Input
                name="mobile"
                placeholder="mobile"
                className="dark-input"
              />
            </Form.Item>
            <Form.Item
              {...(inputErrors && {
                help: inputErrors
                  ?.find((err) => err?.context?.label == "email")
                  ?.message?.toLowerCase()
                  .replace(`"`, "")
                  .replace(`"`, ""),
                validateStatus: "error",
              })}
              name="email"
              className="text-center"
              rules={[
                { required: true, message: "Email is required" },
                { max: 100, message: "Exceeded maximum character length" },
                { type: "email", message: "Must be valid email" },
              ]}
            >
              <Input name="email" placeholder="Email" className="dark-input" />
            </Form.Item>
            <Form.Item
              {...(inputErrors && {
                help: inputErrors
                  ?.find((err) => err?.context?.label == "password")
                  ?.message?.toLowerCase()
                  .replace(`"`, "")
                  .replace(`"`, ""),
                validateStatus: "error",
              })}
              name="password"
              rules={[
                { required: true, message: "Password is required" },
                { max: 100, message: "Exceeded maximum character length" },
              ]}
            >
              <Input
                name="password"
                placeholder="Password"
                className="dark-input"
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="main-button">
              Signup
            </Button>
            <div className="mt-2">
              <Link to="/login">
                <span className="main-text">Login</span>
              </Link>
            </div>
          </Form>
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.error,
  inputErrors: state.auth.inputErrors,
  user: state.auth.user,
  auth: state.auth,
});

const mapDispatchToProps = { signup };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
