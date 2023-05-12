import React, { useState } from "react";
import { Button, Modal } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import NovelSearch from "@/components/pages/admin/NovelSearch";
import Image from "next/image";
import AdminButton from "@/components/pages/admin/AdminButton";
import ScheduleTable from "@/components/pages/admin/ScheduleTable";
import CardTable from "@/components/pages/admin/CardTable";
import NovelList from "@/components/pages/admin/NovelList";
import { Input } from "antd";
import { DatePicker, Space } from "antd";
import { Select } from "antd";
import { useRouter } from "next/router";

const { Content, Footer, Sider } = Layout;

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
  const [currentTap, setCurrentTap] = useState("1");
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClickHandler = (item: any) => {
    setCurrentTap(item.key as string);
    console.log(item.key);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { RangePicker } = DatePicker;

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const router = useRouter();
  const moveNovelForm = () => {
    router.push("/admin/novelForm");
  };

  const OPTIONS = ["Apples", "Nails", "Bananas", "Helicopters"];
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const filteredOptions = OPTIONS.filter((o) => !selectedItems.includes(o));
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
          defaultSelectedKeys={[`${currentTap}`]}
          mode="inline"
          items={items}
          onClick={onClickHandler}
        />
      </Sider>

      <Layout className="site-layout">
        <>
          {currentTap === "1" && (
            <>
              <Content style={{ margin: "0 16px" }}>
                <NovelSearch />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: "1rem",
                  }}
                >
                  <AdminButton title={"소설등록"} onClick={moveNovelForm} />
                </div>
                <NovelList />
              </Content>
            </>
          )}
          {currentTap === "2" && (
            <>
              <Content style={{ margin: "0 16px" }}>
                <NovelSearch />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: "1rem",
                  }}
                >
                  <AdminButton title={"스케줄등록"} onClick={showModal} />
                </div>

                <Modal
                  title="스케줄 등록"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <div style={{ margin: "30px 0px" }}>
                    <div style={{ display: "flex", margin: "20px 0px" }}>
                      <div style={{ width: "120px" }}>스케줄</div>
                      <Input placeholder="Basic usage" />
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "20%" }}>이벤트기간</div>
                      <Space direction="vertical" size={12}>
                        <RangePicker />
                      </Space>
                    </div>
                  </div>
                </Modal>

                <ScheduleTable />
              </Content>
            </>
          )}
          {currentTap === "3" && (
            <>
              <Content style={{ margin: "0 16px" }}>
                <NovelSearch />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "right",
                    margin: "1rem",
                  }}
                >
                  <AdminButton title={"카드등록"} onClick={showModal} />
                </div>
                <Modal
                  title="Card등록"
                  open={isModalOpen}
                  onOk={handleOk}
                  onCancel={handleCancel}
                >
                  <div style={{ margin: "30px 0px" }}>
                    <div style={{ display: "flex", margin: "20px 0px" }}>
                      <div style={{ width: "80px" }}>스케줄</div>
                      <Space wrap>
                        <Select
                          defaultValue="lucy"
                          style={{ width: "120px" }}
                          onChange={handleChange}
                          options={[
                            { value: "jack", label: "Jack" },
                            { value: "lucy", label: "Lucy" },
                            { value: "Yiminghe", label: "yiminghe" },
                            {
                              value: "disabled",
                              label: "Disabled",
                              disabled: true,
                            },
                          ]}
                        />
                      </Space>
                    </div>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "100px" }}>소설</div>
                      <Select
                        mode="multiple"
                        placeholder="Inserted are removed"
                        value={selectedItems}
                        onChange={setSelectedItems}
                        style={{ width: "100%" }}
                        options={filteredOptions.map((item) => ({
                          value: item,
                          label: item,
                        }))}
                      />
                    </div>
                  </div>
                </Modal>
                <CardTable />
              </Content>
            </>
          )}
        </>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Main;
