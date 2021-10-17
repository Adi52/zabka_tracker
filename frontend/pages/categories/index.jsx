import { Card, Layout, Typography } from "antd";
import getCategoriesList from "../../helpers/api/getCategoriesList";
import Link from "next/link";

const { Content } = Layout;
const { Title } = Typography;

const CategoriesPage = ({ categories }) => {
  console.log(categories);
  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <Title level={3}>Categories</Title>
      <div
        className="site-layout-content"
        style={{
          padding: 24,
          minHeight: "80vh",
          backgroundColor: "transparent",
        }}
      >
        <div className="flex-row">
          {categories.map((category) => (
            <Link href={`/categories/${category.id}`} key={category.id}>
              <Card
                title={category.name}
                bordered={false}
                style={{ width: 300, marginRight: 40, cursor: "pointer" }}
              >
                <p>{category.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Content>
  );
};

export async function getServerSideProps() {
  let categories;
  const [error, response] = await getCategoriesList();

  if (response) {
    categories = response;
  }

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      categories,
    },
  };
}

export default CategoriesPage;
