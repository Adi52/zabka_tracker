import { Button, Card, Layout, Typography } from "antd";
import Link from "next/link";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import getCategoriesList from "../../helpers/api/getCategoriesList";
import AddCategoryModal from "../../components/AddCategoryModal";

const { Content } = Layout;
const { Title } = Typography;

const CategoriesPage = ({ categories }) => {
  const { jwt } = parseCookies();
  const [isLogged, setIsLogged] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
          Categories
        </Title>
        {isLogged && (
          <Button type="primary" onClick={() => setModalVisible(true)}>
            + Add category
          </Button>
        )}
      </div>
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
                style={{
                  width: 290,
                  marginRight: 30,
                  marginBottom: 30,
                  cursor: "pointer",
                }}
              >
                <p>{category.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <AddCategoryModal setVisible={setModalVisible} visible={modalVisible} />
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
