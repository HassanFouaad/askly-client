import { Avatar } from "antd";
import React from "react";
import { connect } from "react-redux";

export const Message = ({ message, user }) => {
  let { sender, message: messageContent, createdAt } = message;
  return (
    <div
      className="questionItem my-1"
      dir={sender.id == user.id ? "rtl" : "ltr"}
    >
      <div className="row">
        <div className="col-1 mt-1">
          <div className={sender.id == user.id ? "text-end" : "text-start"}>
            <Avatar src={sender.image} />
          </div>
        </div>
        <div className="col-8 mx-2">
          <div className="mt-2">
            <div>
              <p
                style={{
                  borderRadius: "15px",
                  wordBreak: "break-word",
                  backgroundColor:
                    sender.id == user.id ? "var(--primaryColor)" : "#2E2F41",
                }}
                className={
                  sender.id == user.id
                    ? "text-end px-2 py-2"
                    : "text-start px-2 py-2"
                }
              >
                {messageContent}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
