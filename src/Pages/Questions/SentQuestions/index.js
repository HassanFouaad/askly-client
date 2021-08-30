import React from "react";
import { connect } from "react-redux";
import QuestionItem from "../QuestionItem";
import ThinkingEmoji from "../../../Assets/thinking.png";

import { getSentQuestions } from "../../../store/actions/questionsActions";
import InfiniteScroll from "react-infinite-scroll-component";
import { Row } from "reactstrap";
import { useEffect } from "react";
import { Loader } from "../../../Components/Loader";
export const SentQuestions = ({ getSentQuestions ,loading}) => {
  const [data, setData] = React.useState({
    questions: [],
    thisPage: 1,
    allPages: 1,
  });
  const { questions, thisPage, allPages } = data;
  let getQues = async (page) => {
    const qs = await getSentQuestions({ limit: 6 }, page);
    if (page == 1) {
      setData({
        questions: qs.result,
        thisPage: qs.thisPage,
        allPages: qs.allPages,
      });
    } else {
      setData({
        questions: [...questions, ...qs.result],
        thisPage: qs.thisPage,
        allPages: qs.allPages,
      });
    }
  };

  useEffect(() => {
    getQues(1);
  }, []);

  let fetchData = () => {
    return getQues(thisPage + 1);
  };
  if (loading) return <Loader />;
  return (
    <div className="container mainBox px-2">
      <h4 className="tex-left head-text">
        Sent Questions <img src={ThinkingEmoji} height="20px" />
      </h4>
      {questions?.length == 0 && (
        <h6 className="main-text text-center mt-5">
          Empty Questions, Try to ask someone!
        </h6>
      )}
      <Row>
        <InfiniteScroll
          dataLength={questions.length} //This is important field to render the next data
          next={fetchData}
          hasMore={true}
        >
          {questions?.map((q, i) => {
            return <QuestionItem key={i} question={q} sent={true} />;
          })}
        </InfiniteScroll>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading:state.questions.loading
});

const mapDispatchToProps = { getSentQuestions };

export default connect(mapStateToProps, mapDispatchToProps)(SentQuestions);
