import { Descriptions, Badge, Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import style from "@/components/pages/admin/NovelDetail.module.css";
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
  const baseUrl = Config().baseUrl;
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

  // console.log(data.data);
  // useEffect(() => {
  //   setNovelData({
  //     id: data.data.id,
  //     title: data.data.title,
  //     author: data.data.author,
  //     grade: data.data.grade,
  //     genre: data.data.genre,
  //     serializationStatus: data.data.serializationStatus,
  //     authorComment: data.data.authorComment,
  //     serializationDay: data.data.serializationDay,
  //     startDate: data.data.startDate,
  //     description: data.data.description,
  //     thumbnail: data.data.thumbnail,
  //     tags: data.data.tags,
  //   });
  // }, []);

  useEffect(() => {
    if (!router.isReady) return;
    else {
      axios
        .get(`${baseUrl}/novels-service/v1/admin/novels/${novelId}`)
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
  const moveBack = () => {
    router.push(`/admin/main`);
  };

  const moveEditForm = () => {
    router.push(`/admin/episodeForm?novel=${novelData.id}`);
  };

  return (
    <>
      <div className={style.container}>
        <Button type="primary" htmlType="submit" onClick={moveBack}>
          뒤로가기
        </Button>
        <Button onClick={moveEditForm}>에피소드 등록</Button>

        <Descriptions title="소설 정보" bordered>
          <Descriptions.Item label="작품명" span={3}>
            {novelData.title}
          </Descriptions.Item>
          <Descriptions.Item label="작가" span={2}>
            {novelData.author}
          </Descriptions.Item>
          <Descriptions.Item label="연령" span={1}>
            {novelData.grade}
          </Descriptions.Item>
          <Descriptions.Item label="연재요일" span={2}>
            {novelData.serializationDay}
          </Descriptions.Item>
          <Descriptions.Item label="연재상태" span={1}>
            <Badge status="processing" text={novelData.serializationStatus} />
          </Descriptions.Item>
          <Descriptions.Item label="작품소개" span={3}>
            {novelData.description}
          </Descriptions.Item>
          <Descriptions.Item label="대표 이미지" span={3}>
            <Image width={200} height={250} src={novelData.thumbnail} />
          </Descriptions.Item>
        </Descriptions>
      </div>
    </>
  );
}
