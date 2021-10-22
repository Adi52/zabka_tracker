import {
  Form,
  Input,
  Button,
  Row,
  Layout,
  Alert,
  Typography,
  notification,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";
import login from "../helpers/api/logIn";

const { Content } = Layout;
const { Title } = Typography;

const validateMessages = {
  required: "${label} is required!",
};

const LoginPage = () => {
  const router = useRouter();
  const [wrongCredentials, setWrongCredentials] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setIsLoading(true);
    const { email, password } = values?.user;
    const [error, response] = await login({ email, password });
    if (error) {
      setWrongCredentials(true);
    } else {
      setCookie(null, "jwt", response.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      setCookie(null, "userId", response.user?.id, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
      notification.success({
        key: "login",
        message: "Login",
        description: "Successfully logged in.",
      });
      router.push("/");
    }
    setIsLoading(false);
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{ minHeight: "85vh" }}
    >
      <Content style={{ padding: "0 50px", maxWidth: 600, margin: "auto" }}>
        <div className="site-layout-content">
          <Form
            style={{ minWidth: 300, padding: 20 }}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Title level={3} style={{ textAlign: "center", marginBottom: 40 }}>
              LOGIN
            </Title>
            {wrongCredentials && (
              <Alert
                message="Wrong credentials!!"
                type="error"
                style={{ marginBottom: 25 }}
              />
            )}
            <Form.Item
              name={["user", "email"]}
              rules={[{ type: "email", required: true }]}
            >
              <Input
                size="large"
                placeholder="Email"
                prefix={<MailOutlined />}
              />
            </Form.Item>

            <Form.Item
              name={["user", "password"]}
              rules={[{ required: true, min: 6 }]}
              hasFeedback
            >
              <Input.Password
                size="large"
                placeholder="Password"
                prefix={<LockOutlined />}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Row>
  );
};

export default LoginPage;
