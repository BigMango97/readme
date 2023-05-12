import { PlusOutlined } from "@ant-design/icons";
import { Button, Descriptions, Input, Badge } from "antd";
import React, { useEffect, useState } from "react";
import style from "@/components/pages/admin/Episode.module.css";
import dayjs from "dayjs";
import { Image } from "antd";
import axios from "axios";
import Config from "@/configs/config.export";
import { novelType } from "@/types/admin/novelType";
import { useRouter } from "next/router";

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export default function NovelDetail() {
  const router = useRouter();
  const novelId = router.query.novelId;
  console.log(" novelIdnovelId ", router);

  const [novelData, setNovelData] = useState<novelType>({
    id: 0,
    title: "",
    author: "",
    grade: -1,
    genre: "",
    serializationStatus: "",
    authorComment: "",
    serializationDay: [],
    startDate: dayjs(),
    description: "",
    thumbnail: "",
    tags: [],
  });

  useEffect(() => {
    if (!router.isReady) return;
    else {
      axios
        .get(
          `http://43.200.189.164:8000/novels-service/v1/admin/novels/${novelId}`
        )
        .then((res) => {
          console.log("res.data = ", res.data);
          setNovelData({
            id: res.data.data.id,
            title: res.data.data.title,
            author: res.data.data.author,
            grade: res.data.data.grade,
            genre: res.data.data.genre,
            serializationStatus: res.data.data.serializationStatus,
            authorComment: res.data.data.authorComment,
            serializationDay: res.data.data.serializationDay,
            startDate: res.data.data.startDate,
            description: res.data.data.description,
            thumbnail: res.data.data.thumbnail,
            tags: res.data.data.tags,
          });
        });
    }
  }, [router.isReady]);

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
            {novelData.serializationDay}
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
