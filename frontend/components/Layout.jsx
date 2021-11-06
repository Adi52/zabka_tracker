// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from "prop-types";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { Layout, Menu, notification } from "antd";
import { useRouter } from "next/router";
import Image from "next/image";
import NAVIGATION, { NO_AUTH } from "../utils/constans/navigation";
import NavItem from "./NavItem";

const { Header, Footer } = Layout;
const { SubMenu } = Menu;

const PageLayout = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const { jwt, userId } = parseCookies();

  const logout = () => {
    setCookie(null, "jwt", "", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    notification.success({
      key: "logout",
      message: "Logout",
      description: "Successfully logged out.",
    });
    router.push("/");
  };

  useEffect(() => {
    setIsLogged(!!jwt);
  }, [jwt]);

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">
          <Image src="/logo.png" width="120" height="31" />
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={["/"]}>
          {NAVIGATION.map((item) => (
            <NavItem key={item.id} slug={item.slug} label={item.label} />
          ))}
          {!isLogged ? (
            NO_AUTH.map((item) => (
              <NavItem key={item.id} slug={item.slug} label={item.label} />
            ))
          ) : (
            <SubMenu key="sub1" title="Profile">
              <NavItem slug={`/users/${userId}`} label="Show Profile" />
              <Menu.Item key="5" onClick={logout}>
                Logout
              </Menu.Item>
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
