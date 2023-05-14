import React, { useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Input, MenuProps, Modal } from "antd";
import { Layout, Menu, theme } from "antd";
import NovelSearch from "@/components/pages/admin/NovelSearch";
import Image from "next/image";
import NovelForm from "@/components/pages/admin/NovelForm";
import AdminButton from "@/components/pages/admin/AdminButton";
import NovelList from "@/components/pages/admin/NovelList";
import SideBar from "@/components/layouts/SideBar";
import AdminFooter from "@/components/layouts/AdminFooter";
const { Header, Content, Footer, Sider } = Layout;

const novelForm = () => {
  //const [collapsed, setCollapsed] = useState(false);
  const [currentTap, setCurrentTap] = useState("1");
  // const {
  //   token: { colorBgContainer },
  // } = theme.useToken();
  const onClickHandler = (item: any) => {
    setCurrentTap(item.key as string);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <>
          <Content style={{ margin: "0 16px" }}>
            {/* <NovelSearch /> */}
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                margin: "1rem",
              }}
            >
              <NovelForm />
            </div>
          </Content>
        </>
        <AdminFooter />
      </Layout>
    </Layout>
  );
};

export default novelForm;
