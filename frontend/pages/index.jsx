import { Button, Layout, Typography } from "antd";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import Map from "../components/Map";
import getMarkersList from "../helpers/api/getMarkersList";
import getCategoriesList from "../helpers/api/getCategoriesList";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = ({ markers, categoriesList }) => {
  const { jwt } = parseCookies();
  const [isLogged, setIsLogged] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

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
        {isLogged && (
          <Button type="primary" onClick={() => setIsEditMode(true)}>
            + Add place
          </Button>
        )}
      </div>
      <div
        className="site-layout-content"
        style={{
          padding: 24,
          minHeight: "78vh",
          display: "flex",
        }}
      >
        <Map
          markers={markers}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          categoriesList={categoriesList}
        />
      </div>
    </Content>
  );
};

export async function getServerSideProps() {
  const [error, response] = await getMarkersList();
  const [error2, response2] = await getCategoriesList();

  if (error || error2) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      markers: response,
      categoriesList: response2,
    },
  };
}

export default HomePage;
