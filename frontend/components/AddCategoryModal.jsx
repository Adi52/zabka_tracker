import { Button, Form, Input, Modal, notification } from "antd";
import { useState } from "react";
import { useRouter } from "next/router";
import addCategory from "../helpers/api/addCateogry";

const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required!",
};

export const FooterComponent = ({ closeModal, loading }) => (
  <div className="flex-row justify-end">
    <Button onClick={closeModal}>Close</Button>
    <Button
      type="primary"
      form="add-category-form"
      key="submit"
      htmlType="submit"
      loading={loading}
    >
      Add
    </Button>
  </div>
);

const AddCategoryModal = ({ visible, setVisible }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleOk = async (values) => {
    const { title, description } = values;
    setConfirmLoading(true);
    const [error, response] = await addCategory({ title, description });
    if (error) {
      notification.error({
        key: "error-category",
        message: "Something went wrong",
        description: "Something went wrong with add new category. Try again!",
      });
    }
    if (response) {
      notification.success({
        key: "category",
        message: "Added category",
        description: "Successfully added new category.",
      });
    }
    setConfirmLoading(false);
    setVisible(false);
    form.resetFields();
    router.replace(router.asPath);
  };

  return (
    <Modal
      title="Add new category"
      onCancel={handleCancel}
      visible={visible}
      footer={
        <FooterComponent closeModal={handleCancel} loading={confirmLoading} />
      }
    >
      <Form
        form={form}
        style={{ minWidth: 300, padding: 20 }}
        name="nest-messages"
        validateMessages={validateMessages}
        onFinish={handleOk}
        id="add-category-form"
      >
        <Form.Item name="title" rules={[{ required: true }]}>
          <Input size="large" placeholder="Title" />
        </Form.Item>

        <Form.Item name="description">
          <Input.TextArea size="large" placeholder="Description" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCategoryModal;
