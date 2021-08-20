import React from "react";
import { connect } from "react-redux";
import { Form, Input, Button, notification, Row } from "antd";
import { login } from "../../store/actions/authActions";
export const Login = ({ login: loginAction, error, auth, history }) => {
  const onSubmit = (data) => {
    loginAction(data);
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
            <Form.Item
              name="email"
              className="text-center"
              rules={[
                { required: true, message: "Email is required" },
                { max: 100, message: "Exceeded maximum character length" },
              ]}
            >
              <Input name="email" placeholder="Email" className="dark-input" />
            </Form.Item>
            <Form.Item
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
              Login
            </Button>
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

const mapDispatchToProps = { login };

export default connect(mapStateToProps, mapDispatchToProps)(Login);
