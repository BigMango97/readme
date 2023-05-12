import { PlusOutlined } from "@ant-design/icons";
import { Button, Descriptions, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import style from "@/components/pages/admin/EpisodeDetail.module.css";
import dayjs from "dayjs";
import Config from "@/configs/config.export";
import axios from "axios";
import { episodeType } from "@/types/admin/episodeType";
import { useRouter } from "next/router";

// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

export default function EpisodeDetail() {
  const router = useRouter();
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

  const baseUrl = Config().baseUrl;
  useEffect(() => {
    axios
      .get(`${baseUrl}/novels-service/v1/admin/episodes/${epiId}`)
      .then((res) => {
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
  }, []);

  const moveBack = () => {
    router.push(`/admin/novel/${epiData.novelId}`);
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
            <Descriptions.Item label="컨텐츠(소설내용)">
              {epiData.content}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
}
