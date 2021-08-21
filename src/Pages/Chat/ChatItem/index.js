import { Avatar } from "antd";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

export const ChatItem = ({ chat }) => {
  const { lastMessage } = chat;
  let sender =
    chat.receiver?.id === chat.user?.id ? chat.creator : chat.receiver;
  const history = useHistory();
  return (
    <div
      className="questionItem my-2"
      onClick={() => history.push(`/chat/${chat.id}`)}
    >
      <div className="row">
        <div className="col-2">
          <Avatar src={sender.image} />
        </div>
        <div className="col-8">
          <div>
            <span className="main-text">
              {sender.firstName} {sender.lastname}
            </span>
          </div>
          <div>
            <span className="sec-text">{lastMessage}</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatItem);
