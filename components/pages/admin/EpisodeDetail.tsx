import { Button, Descriptions, Input, Space } from "antd";
import React, { useEffect, useState } from "react";
import style from "@/components/pages/admin/EpisodeDetail.module.css";
import dayjs from "dayjs";
import Config from "@/configs/config.export";
import axios from "axios";
import { episodeType } from "@/types/admin/episodeType";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";

// const normFile = (e: any) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };

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

  const baseUrl = Config().baseUrl;
  useEffect(() => {
    if (!router.isReady) return;
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
            <Descriptions.Item label="컨텐츠(소설내용)">
              {epiData.content}
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </>
  );
}

// interface EpisodeProps {
//   novel: {
//     title: string;
//   };
//   episode: {
//     title: string;
//     content: string;
//   };
// }

// interface Params extends ParsedUrlQuery {
//   novelId: string;
//   episodeId: string;
// }

// const res = await fetch('http://.../posts')
//   const posts = await res.json()

//   const paths = posts.map((post) => ({
//     params: { id: post.id },
//   }))

//   return { paths, fallback: false }
// export const getStaticPaths: GetStaticPaths = async () => {
//   // 동적 라우트 매개변수를 가져옵니다.
//   const baseUrl = Config().baseUrl;
//   const res = await fetch(`${baseUrl}/novels-service/v1/admin/episodes`);
//   const data = await res.json();
//   const episode = await data.json();

//   // paths 배열에 동적 라우트 매개변수를 추가합니다.
//   // const paths = episodes.map(async (novelId) => {
//   //   const episodeIds = await fetchEpisodeIds(novelId);
//   //   return episodeIds.map((episodeId) => ({
//   //     params: {
//   //       novelId,
//   //       episodeId,
//   //     },
//   //   }));
//   // });

//   return {
//     paths: (await Promise.all(paths)).flat(),
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   // 동적 라우트 매개변수를 사용하여 데이터를 가져옵니다.
//   //const { novelId, episodeId } = params!;
//   //const novel = await fetchNovel(novelId);
//   const params = context.params;
//   const baseUrl = Config().baseUrl;
//   // const episode = await axios.get(
//   //   `${baseUrl}/novels-service/v1/admin/episodes/${episodeId}`
//   // );

//   console.log("params = ");
//   return {
//     props: {
//       params,
//     },
//   };
// };

// axios
//       .get(`${baseUrl}/novels-service/v1/admin/episodes/${epiId}`)
//       .then((res) => {
//         console.log(res.data);
//         setEpiData({
//           id: res.data.data.id,
//           novelId: res.data.data.novelId,
//           title: res.data.data.title,
//           content: res.data.data.content,
//           registration: res.data.data.registration,
//           createDate: res.data.data.createDate,
//           updateDate: res.data.data.updateDate,
//           free: res.data.data.free,
//           status: res.data.data.status,
//         });
