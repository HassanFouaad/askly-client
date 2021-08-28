import React from "react";
import { connect } from "react-redux";
import { getChats } from "../../store/actions/chatActions";
import { ChatItem } from "./ChatItem";

export const Chat = ({ loading, chats, getChats, thisPage, user }) => {
  React.useEffect(() => {
    getChats({ limit: 15 }, 1);
  }, []);
  return (
    <div className="container">
      <div className="mainBox my-4 row px-2">
        {chats &&
          user &&
          chats.length != 0 &&
          chats.map((chat, i) => {
            return <ChatItem chat={chat} key={i} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  chats: state.chat.chats,
  loading: state.chat.loading,
  thisPage: state.chat.thisPage,
  user: state.auth.user,
});

const mapDispatchToProps = { getChats };

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
