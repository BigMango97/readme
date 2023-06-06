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
import { useCookies } from "react-cookie";

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  let menu: undefined | string = "novel" || router.query.menu?.toString();

  const [, , removeCookie] = useCookies(["accessToken"]);

  const clickMenuHandler = (item: any) => {
    if (item.key === "logout") {
      localStorage.removeItem("nickname");
      removeCookie("accessToken", { path: "/" });
      router.push("/admin/main");
    } else router.push(`/admin/main?menu=${item.key}`);
  };
  const clickLogoHandler = () => {
    router.push(`/admin/main?menu=novel`);
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
    getItem("소설관리", "novel", <PieChartOutlined />),
    getItem("스케줄관리", "schedule", <DesktopOutlined />),
    getItem("카드관리", "card", <FileOutlined />),
    getItem("로그아웃", "logout", <FileOutlined />),
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
          defaultSelectedKeys={[menu]}
          mode="inline"
          items={items}
          onClick={clickMenuHandler}
        />
      </Sider>
    </>
  );
}
