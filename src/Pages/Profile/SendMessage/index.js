import { connect } from "react-redux";
import { ModalProps, Modal, Button, Form, Input, Switch, Avatar } from "antd";
import React from "react";
import { sendNewMessage } from "../../../store/actions/messageActions";
import { RiMessage3Fill } from "react-icons/ri";
export const SendMessage = ({
  showAskModal,
  setAskModal,
  profile,
  user,
  sendNewMessage,
}) => {
  const showModal = (state) => {
    setAskModal(state);
  };

  const [form] = Form.useForm();
  function handleSubmit() {
    form.validateFields().then((values) => {
      sendNewMessage({ message: values.message, receiverId: profile?.id });
      setAskModal(false);
    });
  }

  if (!profile) return;

  return (
    <Modal
      visible={showAskModal}
      onCancel={() => showModal(false)}
      className="askmodal"
      bodyStyle={{
        fontFamily: "Cairo",
        fontWeight: "bolder",
        color: "var(--primaryColor)",
        background: "var(--thirdColor)",
        borderRadius: "10px",
      }}
      style={{
        background: "var(--thirdColor)",
        borderRadius: "20px",
      }}
      footer={false}
    >
      <div className="row mt-2 mb-4">
        <div className="col-2">
          <Avatar src={profile.image} />
        </div>
        <div className="col-2">
          {profile.firstName} {profile.lastname}
        </div>
      </div>
      <Form className={`text-center`} form={form}>
        <Form.Item
          name="message"
          className="text-center "
          rules={[
            { required: true, message: "Question can not be empty" },
            { max: 100, message: "Exceeded maximum character length" },
          ]}
        >
          <Input.TextArea
            name="message"
            className="dark-input"
            placeholder="Message goes here..."
          />
        </Form.Item>

        <Button className="main-button" onClick={handleSubmit}>
          <RiMessage3Fill />
        </Button>
      </Form>
    </Modal>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = { sendNewMessage };

export default connect(mapStateToProps, mapDispatchToProps)(SendMessage);
