import React from "react";
import { connect } from "react-redux";
import QuestionItem from "../QuestionItem";
import ThinkingEmoji from "../../../Assets/thinking.png";
import CoolEmoji from "../../../Assets/cool.png";
import { getQuestions } from "../../../store/actions/questionsActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "reactstrap";
import { useEffect } from "react";
export const ReceievedQuestions = ({ questions, getQuestions, thisPage }) => {
  useEffect(() => {
    getQuestions({ answerd: false, limit: 6 }, 1);
  }, []);

  let fetchData = () => {
    return getQuestions({ answerd: false, limit: 6 }, thisPage + 1);
  };

  return (
    <div className="container mainBox">
      <h4 className="tex-left head-text">
        Receieved Questions <img src={ThinkingEmoji} height="20px" />
      </h4>
      {questions?.length == 0 && (
        <h6 className="main-text text-center mt-5">
          Empty Questions, you are safe! <img src={CoolEmoji} height="20px" />
        </h6>
      )}
      <Row>
        <InfiniteScroll
          dataLength={questions.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
          refreshFunction={() => {
            getQuestions({ answerd: false, limit: 6 }, 1);
          }}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: "center" }}>
              &#8595; Pull down to refresh
            </h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
          }
        >
          {questions?.map((q, i) => {
            return <QuestionItem key={i} question={q} />;
          })}
        </InfiniteScroll>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  thisPage: state.questions.thisPage,
});

const mapDispatchToProps = { getQuestions };

export default connect(mapStateToProps, mapDispatchToProps)(ReceievedQuestions);
