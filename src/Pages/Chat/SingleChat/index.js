import { Input, Button, Form } from "antd";
import Avatar from "antd/lib/avatar/avatar";

import React from "react";
import { connect } from "react-redux";
import {
  getChatMessages,
  sendNewMessage,
} from "../../../store/actions/messageActions";
import Message from "./Message";

export const SingleChat = ({
  match: {
    params: { chatId },
  },
  user,
  getChatMessages,
  messages,
  chat,
  sendNewMessage,
  thisPage,
  allPages,
}) => {
  const [sender, setSender] = React.useState(null);

  const [form] = Form.useForm();
  const submitMessage = (values) => {
    console.log(sender);
    sendNewMessage({ message: values.message, receiverId: sender?.id });
    return form.resetFields();
  };
  let fetchData = (e) => {
    const { scrollTop } = e.target;
    if (scrollTop == 0) {
      if (thisPage != allPages) {
        getChatMessages({ chatId, limit: 8 }, thisPage + 1);
      }
    }
  };

  React.useEffect(() => {
    getChatMessages({ chatId, limit: 8 }, 1);
  }, [chatId]);

  React.useEffect(() => {
    if (chat && user) {
      let chatUsers = [chat.receiver, chat.creator];
      console.log(chatUsers);
      let thisSender = chatUsers.find((chatter) => chatter.id != user.id);
      setSender(thisSender);
    }
  }, [chat]);

  return (
    <div className="container">
      <div className="mainBox my-2 px-3 py-2">
        {chat && sender && (
          <>
            <div className="row questionItem">
              <div className="col-1 mx-1">
                <span className="main-text">
                  <Avatar src={sender.image} />
                </span>
              </div>
              <div className="col-8 mx-2">
                <span className="main-text">
                  {sender.firstName} {sender.lastname}
                </span>
              </div>
            </div>
            <div
              className="questionItem my-2 "
              style={{
                height: "380px",
                overflow: "auto",
              }}
              id="messageContainer"
              onScroll={fetchData}
            >
              {messages.map((message, i) => {
                return <Message message={message} key={i} />;
              })}
            </div>
            <div className="row questionItem">
              <Form onFinish={submitMessage} form={form}>
                <div className="row justify-content-center">
                  <div className="col-md-8 my-1">
                    <Form.Item name="message" label="...">
                      <Input.TextArea
                        name="message"
                        className="dark-input"
                        style={{
                          resize: "none",
                        }}
                      />
                    </Form.Item>
                  </div>
                  <div className="col-md-1 my-1">
                    <Form.Item>
                      <Button className="main-button" htmlType="submit">
                        Send
                      </Button>{" "}
                    </Form.Item>
                  </div>
                </div>
              </Form>
            </div>
          </>
        )}
      </div>
      ;
    </div>
  );
};

const mapStateToProps = (state) => ({
  messages: state.messages.messages,
  thisPage: state.messages.thisPage,
  allPages: state.messages.allPages,
  loading: state.messages.loading,
  chat: state.messages.chat,
  socket: state.socket.socket,
  user: state.auth.user,
});

const mapDispatchToProps = { getChatMessages, sendNewMessage };

export default connect(mapStateToProps, mapDispatchToProps)(SingleChat);
