import React, { useState } from "react";
import { Layout } from "antd";

import SideBar from "@/components/layouts/SideBar";
import AdminFooter from "@/components/layouts/AdminFooter";
import NovelSearch from "../pages/admin/NovelSearch";

const { Content } = Layout;

export default function AdminLayout(props: { children: React.ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <Content style={{ margin: "0 16px" }}>{props.children}</Content>
        <AdminFooter />
      </Layout>
    </Layout>
  );
}
