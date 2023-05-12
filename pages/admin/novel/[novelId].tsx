import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import Episode from "@/components/pages/admin/NovelDetail";
import Image from "next/image";
import NovelDetail from "@/components/pages/admin/NovelDetail";
import EpisodeList from "@/components/pages/admin/EpisodeList";
import { useRouter } from "next/router";
const { Header, Content, Footer, Sider } = Layout;

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

const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { query } = useRouter();

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
          />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <NovelDetail novelId={query.novelId} />
          <EpisodeList novelId={query.novelId} />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
