import { connect } from "react-redux";
import { Modal, Button, Form, Input, Switch, Avatar } from "antd";
import { RiQuestionAnswerFill } from "react-icons/ri";
import React from "react";
import { askQuestion } from "../../../store/actions/questionsActions";

export const AskModal = ({
  showAskModal,
  setAskModal,
  profile,
  user,
  askQuestion,
}) => {
  const [annon, setAnnon] = React.useState(false);
  const showModal = (state) => {
    setAskModal(state);
  };

  const [form] = Form.useForm();
  function handleSubmit() {
    form.validateFields().then((values) => {
      askQuestion(
        { ...values, userId: profile.id, annonymous: !annon },
        setAskModal
      );
    });
  }

  const changeAnnon = (e) => {
    setAnnon(e);
  };

  if (!profile) return;

  return (
    <Modal
      title={`Ask ${profile?.firstName} something`}
      visible={showAskModal}
      onCancel={() => showModal(false)}
      className="askmodal"
      bodyStyle={{
        fontFamily: "Cairo",
        fontWeight: "bolder",
        color: "var(--primaryColor)",
      }}
      style={{ borderRadius: "20px" }}
      footer={[
        <Button className="main-button" onClick={() => showModal(false)}>
          Cancel
        </Button>,
        <Button className="main-button" onClick={handleSubmit}>
          Ask
        </Button>,
      ]}
    >
      <Form className={`text-center`} form={form}>
        <Form.Item
          name="text"
          className="text-center"
          rules={[
            { required: true, message: "Question can not be empty" },
            { max: 100, message: "Exceeded maximum character length" },
          ]}
        >
          <Input.TextArea name="text" placeholder="Question goes here..." />
        </Form.Item>
        {user && (
          <Switch
            checkedChildren={
              <Avatar
                src={user?.image}
                style={{ height: "15px", width: "15px" }}
              />
            }
            onChange={changeAnnon}
            checked={annon}
            unCheckedChildren="Annonymous"
            defaultChecked
          />
        )}
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = { askQuestion };

export default connect(mapStateToProps, mapDispatchToProps)(AskModal);
