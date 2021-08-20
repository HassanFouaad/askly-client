import React from "react";
import { connect } from "react-redux";
import { getPosts } from "../../store/actions/postActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "reactstrap";
import { PostItem } from "./PostItem";
export const Posts = ({ userId, posts, getPosts, thisPage }) => {
  React.useEffect(() => {
    let query = { userId, limit: 20 };
    if (!userId) query.timeLine = true;
    getPosts(query, 1);
  }, [userId]);

  let fetchData = () => {
    return getPosts({ userId, limit: 20 }, thisPage + 1);
  };

  return (
    <div className="container">
      <Row className="mx-md-5">
        <InfiniteScroll
          dataLength={posts.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          refreshFunction={() => {
            getPosts({ userId, limit: 20 }, 1);
          }}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h4 style={{ textAlign: "center", fontFamily: "Cairo" }}>
              &#8595; Pull down to refresh
            </h4>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {posts?.map((q, i) => {
            return <PostItem key={i} post={q} userId={userId} />;
          })}
        </InfiniteScroll>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.posts.posts,
  thisPage: state.posts.thisPage,
});

const mapDispatchToProps = { getPosts };

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
