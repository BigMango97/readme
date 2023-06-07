import { Button, Descriptions, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import style from "@/components/pages/admin/EpisodeDetail.module.css";
import dayjs from "dayjs";

import { episodeType } from "@/types/admin/episodeType";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";

export default function EpisodeDetail() {
  const router = useRouter();
  const novelId = router.query.novelId;
  const epiId = router.query.episodeId;

  const [epiData, setEpiData] = useState<episodeType>({
    id: 0,
    novelId: 0,
    title: "",
    content: "",
    registration: dayjs(),
    createDate: dayjs(),
    updateDate: dayjs(),
    free: false,
    status: "",
  });

  useEffect(() => {
    if (!router.isReady) return;
    axios.get(`/novels-service/v1/admin/episodes/${epiId}`).then((res) => {
      console.log(res.data);
      setEpiData({
        id: res.data.data.id,
        novelId: res.data.data.novelId,
        title: res.data.data.title,
        content: res.data.data.content,
        registration: res.data.data.registration,
        createDate: res.data.data.createDate,
        updateDate: res.data.data.updateDate,
        free: res.data.data.free,
        status: res.data.data.status,
      });
    });
  }, [router.isReady]);

  const moveBack = () => {
    router.push(`/admin/novels/${novelId}`);
  };

  const createDate = epiData.createDate.toString().substring(0, 10);
  const updateDate = epiData.updateDate.toString().substring(0, 10);

  return (
    <>
      <div className={style.container}>
        <Button type="primary" htmlType="submit" onClick={moveBack}>
          뒤로가기
        </Button>
        <div className={style.info}>
          <Descriptions title="에피소드 정보">
            <Descriptions.Item label="작품명">
              {epiData.title}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="등록일">{createDate}</Descriptions.Item>
            <Descriptions.Item label="수정일">{updateDate}</Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Descriptions.Item label="회차상태">
              {epiData.status}
            </Descriptions.Item>
            <Descriptions.Item label="무료/유료">
              {epiData.free ? "무료" : "유료"}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions>
            <Space
              direction="vertical"
              style={{
                display: "flex",
                flexWrap: "wrap",
                wordBreak: "break-word",
                width: 1000,
              }}
            >
              <Descriptions.Item label="컨텐츠(소설내용)">
                <div dangerouslySetInnerHTML={{ __html: epiData.content }} />
              </Descriptions.Item>
            </Space>
          </Descriptions>
        </div>
      </div>
    </>
  );
}
