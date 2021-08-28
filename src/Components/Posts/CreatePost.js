import React from "react";
import { connect } from "react-redux";
import {} from "react-icons/ri";
import { Button, Form, Input } from "antd";
import { createPost } from "../../store/actions/postActions";

export const CreatePost = ({ createPost }) => {
  const [form] = Form.useForm();

  function handleSubmit() {
    form.validateFields().then((values) => {
      createPost(values);
      form.resetFields();
    });
  }
  return (
    <div className="col-md-12 col-sm mainBox px-5 my-2 py-4">
      <div className={"transFormText"}>
        <Form className={`text-center my-2`} form={form}>
          <Form.Item
            name="text"
            className="text-center my-2"
            rules={[
              { required: true, message: "Post can not be empty" },
              { max: 5000, message: "Exceeded maximum character length" },
            ]}
          >
            <Input.TextArea
              name="answer"
              placeholder="What's going on?"
              className="answer-area"
            />
          </Form.Item>
          <div className="">
            <Button onClick={handleSubmit} className="main-button">
              Create
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { createPost };

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
