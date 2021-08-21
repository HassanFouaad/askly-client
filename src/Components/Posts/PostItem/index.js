import React from "react";
import { connect } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { Avatar } from "antd";
import { useHistory } from "react-router-dom";
import { deletePost } from "../../../store/actions/postActions";

export const PostItem = ({ post, userId, user, deletePost }) => {
  const history = useHistory();
  const deleteSubmit = () => {
    deletePost(post.id);
  };
  return (
    <div className="col-md-12 col-sm mainBox px-5 my-2 py-4">
      {!userId && post.user && (
        <div className="row my-2 justify-content-start text-start">
          <div className="col-md-1 text-start">
            <Avatar
              src={post?.user?.image}
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/profile/${post?.user?.username}`)}
            />
          </div>
          <div className="col-md-11">
            <span
              className="question-text"
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/profile/${post?.user?.username}`)}
            >
              {post?.user?.firstName} {post?.user?.lastname}
            </span>
          </div>
        </div>
      )}
      <div className="row">
        <div className="col-md-11">
          {post.question?.answer ? (
            <div className="mb-3">
              <div className="row justify-content-center">
                <div className="col-md-11 text-start">
                  <span className="sec-text mx-2">{post.question.text}</span>
                  {post.question?.asker && (
                    <Avatar
                      src={post.question?.asker?.image}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        history.push(
                          `/profile/${post.question?.asker?.username}`
                        )
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div>
            <span className="main-text">
              {post.question?.answer ? post?.question?.answer : post?.text}
            </span>
          </div>
        </div>
        {user && user.id === post.userId && (
          <div className="col-md-1 text-end">
            <span>
              <RiDeleteBinLine
                className="main-icon"
                color="var(--primaryColor)"
                onClick={deleteSubmit}
              />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = { deletePost };

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
