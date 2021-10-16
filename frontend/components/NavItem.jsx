import { Menu } from "antd";
import Link from "next/link";

const NavItem = ({ slug = "/", label }) => (
  <Menu.Item key={slug}>
    <Link href={slug}>{label}</Link>
  </Menu.Item>
);

export default NavItem;
