import React, { useEffect, useState } from "react";
import { Layout } from "antd";

import SideBar from "@/components/layouts/SideBar";
import AdminFooter from "@/components/layouts/AdminFooter";
import NovelSearch from "../pages/admin/NovelSearch";
import Login from "@/pages/admin/login";
import { useCookies } from "react-cookie";
import Link from "next/link";

export default function AdminLayout(props: { children: React.ReactNode }) {
  const { Content } = Layout;
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  const [cookies] = useCookies(["accessToken"]);
  useEffect(() => {
    if (localStorage.getItem("name") !== "관리자") {
      setLoginCheck(false);
    }
    if (localStorage.getItem("name") === "관리자" && cookies.accessToken) {
      setLoginCheck(true);
    }
  }, [cookies.accessToken]);

  return (
    <>
      {loginCheck ? (
        <Layout style={{ minHeight: "100vh" }}>
          <SideBar />
          <Layout className="site-layout">
            <Content style={{ margin: "0 16px" }}>{props.children}</Content>
            <AdminFooter />
          </Layout>
        </Layout>
      ) : (
        <Login />
      )}
    </>
  );
}
