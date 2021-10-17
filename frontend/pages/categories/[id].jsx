import getCategoryById from "../../helpers/api/getCategoryById";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title, Text } = Typography;

const CategoryPage = ({ category }) => {
  const { name, description, markers } = category;
  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <Title level={3}>{name}</Title>
      <Text>{description}</Text>
      <div
        className="site-layout-content"
        style={{
          padding: 24,
          minHeight: "80vh",
          backgroundColor: "transparent",
        }}
      >
        {/*  todo: add map and markers list */}
        {/* markers.map... */}
        {/*  */}
      </div>
    </Content>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;
  const [error, response] = await getCategoryById({ id });

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      category: response,
    },
  };
}

export default CategoryPage;
