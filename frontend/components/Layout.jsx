import PropTypes from "prop-types";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import NAVIGATION, { NO_AUTH } from "../utils/constans/navigation";
import NavItem from "./NavItem";

const { Header, Footer } = Layout;
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
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={["/"]}
          openKeys={["/"]}
        >
          {NAVIGATION.map((item) => (
            <NavItem key={item.id} slug={item.slug} label={item.label} />
          ))}
          {!isLogged ? (
            NO_AUTH.map((item) => (
              <NavItem key={item.id} slug={item.slug} label={item.label} />
            ))
          ) : (
            <SubMenu key="sub1" title="Profile">
              <NavItem slug={`/profile`} label="Show Profile" />
              <Menu.Item key="5">Logout</Menu.Item>
            </SubMenu>
          )}
        </Menu>
      </Header>
      {children}
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
