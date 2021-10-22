import { Form, Input, Modal, notification, Select } from "antd";
import { useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/router";
import { FooterComponent } from "./AddCategoryModal";
import addMarker from "../helpers/api/addMarker";

const { Option } = Select;
const validateMessages = {
  // eslint-disable-next-line no-template-curly-in-string
  required: "${label} is required!",
};

const AddMarkerModal = ({
  visible,
  setVisible,
  categoriesList,
  newMarkerLocation,
}) => {
  const router = useRouter();
  const { userId } = parseCookies();
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [category, setCategory] = useState(
    categoriesList ? categoriesList[0].id : null
  );

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleChange = (value) => {
    setCategory(value);
  };

  const handleOk = async (values) => {
    const { title, description } = values;
    setConfirmLoading(true);
    const [error, response] = await addMarker({
      title,
      description,
      userId,
      category,
      latitude: newMarkerLocation.lat,
      longitude: newMarkerLocation.lng,
    });
    setConfirmLoading(false);
    if (error) {
      notification.error({
        key: "error-marker",
        message: "Something went wrong",
        description: "Something went wrong with add new marker. Try again!",
      });
    }
    if (response) {
      notification.success({
        key: "marker",
        message: "Added marker!",
        description: "Successfully added new marker.",
      });
    }
    setConfirmLoading(false);
    setVisible(false);
    form.resetFields();
    router.replace(router.asPath);
  };

  return (
    <Modal
      title="Add new marker"
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

        <Select
          defaultValue={categoriesList ? categoriesList[0].id : null}
          style={{ width: "100%" }}
          onChange={handleChange}
        >
          {categoriesList?.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      </Form>
    </Modal>
  );
};

export default AddMarkerModal;
