import React from "react";
import { connect } from "react-redux";
import { RiQuestionAnswerFill, RiCloseCircleFill } from "react-icons/ri";
import { Form, Input } from "antd";
import { answerQuestion } from "../../../store/actions/questionsActions";
import Avatar from "antd/lib/avatar/avatar";
export const QuestionItem = ({ question, answerQuestion, sent }) => {
  const [form] = Form.useForm();
  const [answerBox, setAnswerBox] = React.useState(false);
  function handleSubmit() {
    form.validateFields().then((values) => {
      answerQuestion({ ...values, questionId: question.id });
    });
  }

  return (
    <div
      className="col-md-12 col-sm questionItem px-5 my-2"
      onClick={() => !answerBox && setAnswerBox(true)}
    >
      <div className="row justify-content-center">
        <div className="col-md-1 my-1 text-start">
          <Avatar src={sent ? question.user?.image : question?.asker?.image} />
        </div>
        <div className="col-md-11 text-start">
          <p className="question-text">{question.text}</p>
        </div>
      </div>

      {answerBox && !sent && (
        <div className={answerBox ? "transFormText" : ""}>
          <Form className={`text-center row`} form={form}>
            <Form.Item
              name="answer"
              className="text-center col-md-8"
              rules={[
                { required: true, message: "Answer can not be empty" },
                { max: 100, message: "Exceeded maximum character length" },
              ]}
            >
              <Input.TextArea
                name="answer"
                placeholder="Answer goes here..."
                className="answer-area"
              />
            </Form.Item>
            <div className=" col-md-4">
              <RiQuestionAnswerFill
                className="main-icon mx-2"
                color="white"
                onClick={handleSubmit}
              />
              <RiCloseCircleFill
                className="main-icon mx-2"
                color="white"
                onClick={() => setAnswerBox(false)}
              />
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { answerQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(QuestionItem);
