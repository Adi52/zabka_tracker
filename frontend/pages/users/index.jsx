import { Layout, Typography, Table } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import getUsersList from "../../helpers/api/getUsersList";

const { Content } = Layout;
const { Title } = Typography;

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    render: (text, data) => (
      <Link href={`/users/${data.key}`}>
        <a>{text}</a>
      </Link>
    ),
  },
  {
    title: "Markers",
    dataIndex: "markers",
    key: "markers",
  },
  {
    title: "Joined",
    dataIndex: "joined",
    key: "joined",
  },
];

const UsersPage = ({ users }) => {
  const data = users.map((user, index) => ({
    key: user.id,
    id: index + 1,
    username: user.username,
    markers: user.markers?.length,
    joined: dayjs(user.created_at).format("DD/MM/YYYY"),
  }));

  return (
    <Content
      className="site-layout"
      style={{ padding: "0 50px", marginTop: 64 }}
    >
      <Title level={3}>Users</Title>
      <div
        className="site-layout-content"
        style={{
          padding: 24,
          minHeight: "80vh",
          backgroundColor: "transparent",
        }}
      >
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 50 }}
        />
      </div>
    </Content>
  );
};

export async function getServerSideProps(ctx) {
  const [error, response] = await getUsersList();

  if (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      users: response,
    },
  };
}

export default UsersPage;
