import { Button, Layout, Typography } from "antd";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import getUserById from "../../helpers/api/getUserById";
import Map from "../../components/Map";
import getCategoriesList from "../../helpers/api/getCategoriesList";

const { Content } = Layout;
const { Title } = Typography;

const UserPage = ({ userData, categoriesList }) => {
  const { jwt, userId } = parseCookies();
  const [showAddButton, setShowAddButton] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (jwt && userId === userData.id.toString()) {
      setShowAddButton(true);
    } else {
      setShowAddButton(false);
    }
  }, [jwt, userId]);

  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <div className="flex-row justify-between">
        <Title level={3} style={{ marginBottom: 0 }}>
          {userData.username}
        </Title>
        {showAddButton && (
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
          markers={userData.markers}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          categoriesList={categoriesList}
        />
      </div>
    </Content>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const [error, response] = await getUserById({ id });
  const [error2, response2] = await getCategoriesList();

  if (error || error2) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      userData: response,
      categoriesList: response2,
    },
  };
}

export default UserPage;
