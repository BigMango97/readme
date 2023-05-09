import { PlusOutlined } from "@ant-design/icons";
import { Button, Descriptions, Input, Badge } from "antd";
import React, { useState } from "react";
import style from "@/components/pages/admin/Episode.module.css";
import dayjs from "dayjs";
import { Image } from "antd";

const { TextArea } = Input;

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function EpisodeView() {
  const novelData = {
    novelId: 0,
    title: "",
    description: "",
    author: "",
    genre: "",
    grade: "",
    thumbnail: "",
    serializationDays: "",
    serializationStatus: "",
  };

  return (
    <>
      <div className={style.container}>
        <Descriptions title="소설 정보" bordered>
          <Descriptions.Item label="작품명" span={3}>
            {novelData.title}
          </Descriptions.Item>
          <Descriptions.Item label="작가" span={2}>
            {novelData.author}
          </Descriptions.Item>
          <Descriptions.Item label="연령">{novelData.grade}</Descriptions.Item>
          <Descriptions.Item label="연재요일" span={2}>
            {novelData.serializationDays}
          </Descriptions.Item>
          <Descriptions.Item label="연재상태" span={3}>
            <Badge status="processing" text={novelData.serializationStatus} />
          </Descriptions.Item>
          <Descriptions.Item label="작품소개" span={3}>
            {novelData.description}
          </Descriptions.Item>
          <Descriptions.Item label="대표 이미지">
            <Image width={200} height={250} src={novelData.thumbnail} />
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
}
