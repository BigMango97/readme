import { PlusOutlined } from "@ant-design/icons";
import { Button, Descriptions, Input, Space } from "antd";
import React, { useState } from "react";
import style from "@/components/pages/admin/EpisodeView.module.css";
import dayjs from "dayjs";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function EpisodeView() {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

  const epiData = {
    id: 0,
    title: "멋진소설제목",
    content: "",
    registration: "",
    free: "",
    status: "",
    createDate: "",
    updateDate: "",
  };

  return (
    <>
      <div className={style.container}>
        <Button type="primary" htmlType="submit" disabled={false}>
          뒤로가기
        </Button>
        <div className={style.info}>
          <Descriptions title="에피소드 정보">
            <Descriptions.Item label="작품명">
              {epiData.title}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="등록일">
              {epiData.createDate}
            </Descriptions.Item>
            <Descriptions.Item label="수정일">
              {epiData.updateDate}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="회차상태">
              {epiData.status}
            </Descriptions.Item>
            <Descriptions.Item label="무료/유료">
              {epiData.free}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="컨텐츠(소설내용)">
              {epiData.content}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
}
