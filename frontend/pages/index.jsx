import { Button, Layout, Typography } from "antd";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import Map from "../components/Map";
import getMarkersList from "../helpers/api/getMarkersList";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = ({ markers }) => {
  const { jwt } = parseCookies();
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (jwt) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [jwt]);

  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <div className="flex-row justify-between">
        <Title level={3} style={{ marginBottom: 0 }}>
          Dashboard
        </Title>
        {isLogged && <Button type="primary">+ Add place</Button>}
      </div>
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
};

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
