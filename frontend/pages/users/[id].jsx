import { Layout, Typography } from "antd";
import getUserById from "../../helpers/api/getUserById";
import Map from "../../components/Map";

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
          minHeight: "78vh",
          display: "flex",
        }}
      >
        <Map markers={userData.markers} />
      </div>
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
