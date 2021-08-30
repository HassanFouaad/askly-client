import React from "react";
import { connect } from "react-redux";
import { RiDeleteBinLine } from "react-icons/ri";
import { Avatar } from "antd";
import { useHistory } from "react-router-dom";
import { deletePost, likePost } from "../../../store/actions/postActions";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const PostItem = ({
  post: reduxPost,
  userId,
  user,
  deletePost,
  likePost: likePostAction,
  posts,
}) => {
  let [post, setPost] = React.useState(null);
  let [liked, setLiked] = React.useState(false);
  const history = useHistory();
  const deleteSubmit = () => {
    deletePost(post.id);
  };

  React.useEffect(() => {
    setPost(reduxPost);
    if (typeof reduxPost.liked != undefined) {
      setLiked(reduxPost.liked);
    }
  }, [reduxPost]);

  return (
    <>
      {post && (
        <div className="col-md-12 col-sm mainBox px-2 my-2 py-2">
          <div className="questionItem">
          {post?.question?.answer ? (
            <div className="questionItem px-3">
              <div className="row justify-content-end">
                <div className="col-md-11 text-end">
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
            {!userId && post.user && (
              <div className="row my-2 justify-content-start">
                <div className="col-md-1 col-2 me-0 ms-2 text-start">
                  <Avatar
                    src={post?.user?.image}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history.push(`/profile/${post?.user?.username}`)
                    }
                  />
                </div>
                <div className="col-md-8 col-2 ms-0 text-start">
                  <span
                    className="question-text"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history.push(`/profile/${post?.user?.username}`)
                    }
                  >
                    {post?.user?.firstName} {post?.user?.lastname}
                  </span>
                </div>
              </div>
            )}
            <div className="row postRow mx-2 py-0">
              <div className="col-md-10 mt-3 mx-2">
                <div>
                  <span className="main-text">
                    {post.question?.answer
                      ? post?.question?.answer
                      : post?.text}
                  </span>
                </div>
              </div>
            </div>
            {typeof liked != "undefined" && (
              <div className="row my-1 mx-2 justify-content-end text-end">
                <div className="col-sm-1 text-end"></div>
                {user && user.id === post.userId && (
                  <div className="col-sm-1 text-end">
                    <span>
                      <RiDeleteBinLine
                        className="mx-2 main-icon"
                        color="var(--primaryColor)"
                        onClick={deleteSubmit}
                      />
                    </span>
                  </div>
                )}
                <div
                  className="col-sm-1"
                  onClick={() => {
                    setLiked(!post.liked);
                    likePostAction(post.id);
                  }}
                >
                  
                  {post.likesCount}
                  {liked == true ? (
                    <AiFillHeart
                      color="var(--primaryColor)"
                      className="mx-2 main-icon"
                    />
                  ) : (
                    <AiOutlineHeart
                      color="var(--primaryColor)"
                      className="mx-2 main-icon"
                    />
                  )}
                  
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  posts: state.auth.posts?.posts,
});

const mapDispatchToProps = { deletePost, likePost };

export default connect(mapStateToProps, mapDispatchToProps)(PostItem);
