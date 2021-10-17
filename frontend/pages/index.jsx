import { Layout, Typography } from "antd";
import Map from "../components/Map";
import getMarkersList from "../helpers/api/getMarkersList";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = ({ markers }) => (
  <Content className="site-layout" style={{ padding: "0 50px", marginTop: 64 }}>
    <Title level={3}>Dashboard</Title>
    <div
      className="site-layout-content"
      style={{
        padding: 24,
        minHeight: "78vh",
        display: "flex",
      }}
    >
      <Map markers={markers} />
    </div>
  </Content>
);

export async function getServerSideProps() {
  const [error, response] = await getMarkersList();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      markers: response,
    },
  };
}

export default HomePage;
