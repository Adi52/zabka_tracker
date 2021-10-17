import { Layout, Typography } from "antd";
import getUserById from "../../helpers/api/getUserById";

const { Content } = Layout;
const { Title } = Typography;

const UserPage = ({ userData }) => {
  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <Title level={3}>{userData.username}</Title>
      <div
        className="site-layout-content"
        style={{
          padding: 24,
          minHeight: "80vh",
          backgroundColor: "transparent",
        }}
      ></div>
    </Content>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const [error, response] = await getUserById({ id });

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userData: response,
    },
  };
}

export default UserPage;
