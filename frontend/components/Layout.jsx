import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import NAVIGATION, { NO_AUTH } from "../utils/constans/navigation";
import NavItem from "./NavItem";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const PageLayout = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const { jwt } = parseCookies();

  useEffect(() => {
    setIsLogged(!!jwt);
  }, [jwt]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          {NAVIGATION.map((item) => (
            <NavItem key={item.id} slug={item.slug} label={item.label} />
          ))}
          {isLogged ? (
            NO_AUTH.map((item) => (
              <NavItem key={item.id} slug={item.slug} label={item.label} />
            ))
          ) : (
            <NavItem href={`/profile`} label="Profile" />
          )}
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <div className="site-layout-content">{children}</div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Adrian Bieliński, Mikołaj Rutkowski, Krzysztof Kowalski
      </Footer>
    </Layout>
  );
};

PageLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default PageLayout;
