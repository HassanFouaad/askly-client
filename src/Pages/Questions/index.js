import { connect } from "react-redux";
import { Tabs } from "antd";
import { RiQuestionFill, RiQuestionnaireFill } from "react-icons/ri";

import { getQuestions } from "../../store/actions/questionsActions";
import ReceievedQuestions from "./ReceievedQuestions";
import SentQuestions from "./SentQuestions";

export const Questions = ({ getQuestions, questions, thisPage }) => {
  const { TabPane } = Tabs;
  return (
    <div className="main-page container text-center">
      <Tabs defaultActiveKey="2">
        <TabPane
          tab={
            <span style={{ color: "white" }}>
              <div className="text-center">
                <RiQuestionnaireFill className="main-icon" />
              </div>
              <div> Received Questions</div>
            </span>
          }
          key="1"
        >
          <ReceievedQuestions />
        </TabPane>
        <TabPane
          tab={
            <span>
              <span style={{ color: "white" }}>
                <div className="text-center">
                  <RiQuestionFill className="main-icon" />
                </div>
                <div> Sent Questions</div>
              </span>
            </span>
          }
          key="2"
        >
          <SentQuestions />
        </TabPane>
      </Tabs>
      ,
    </div>
  );
};

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  thisPage: state.questions.thisPage,
});

const mapDispatchToProps = { getQuestions };

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
