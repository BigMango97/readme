import React, { useEffect, useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
const { Sider } = Layout;
import Image from "next/image";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const clickMenuHandler = (item: any) => {
    router.push(`/admin/main?type=${item.key}`);
  };
  const clickLogoHandler = () => {
    router.push(`/admin/main`);
  };

  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem("소설관리", "1", <PieChartOutlined />),
    getItem("스케줄관리", "2", <DesktopOutlined />),
    getItem("CARD관리", "3", <FileOutlined />),
  ];

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            margin: "0.5rem",
          }}
        >
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={180}
            height={100}
            onClick={clickLogoHandler}
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={clickMenuHandler}
        />
      </Sider>
    </>
  );
}
