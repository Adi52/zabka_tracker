import { Form, Input, Button, Row, Layout, Alert } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import signUp from "../helpers/api/signUp";
import { useState } from "react";
import { setCookie } from "nookies";
import { useRouter } from "next/router";

const { Content } = Layout;
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
};

const SignupPage = () => {
  const router = useRouter();
  const [emailTaken, setEmailTaken] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onFinish = async (values) => {
    setEmailTaken(false);
    setIsLoading(true);
    const { username, email, password } = values?.user;
    const [error, response] = await signUp({ username, email, password });
    if (error) {
      setEmailTaken(true);
    } else {
      setCookie(null, "jwt", response.jwt, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
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
            {emailTaken && (
              <Alert
                message="Account already exist!"
                type="error"
                style={{ marginBottom: 25 }}
              />
            )}

            <Form.Item
              name={["user", "username"]}
              rules={[{ required: true }, { min: 4 }]}
            >
              <Input
                size="large"
                placeholder="Username"
                prefix={<UserOutlined />}
              />
            </Form.Item>
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

            <Form.Item
              name={["user", "confirm"]}
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue(["user", "password"]) === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                placeholder="Confirm password"
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
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Row>
  );
};

export default SignupPage;
