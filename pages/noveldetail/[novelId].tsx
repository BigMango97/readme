import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import NovelTages from "@/components/pages/noveldetail/NovelTages";
import { allDetailDatatype } from "@/types/model/mainDataType";
import Config from "@/configs/config.export";
export default function Novel() {
  const [data, setData] = useState<allDetailDatatype>();
  const router = useRouter();
  const [novelId, setnovelId] = useState(Number(router.query.novelId));
  const baseUrl = Config().baseUrl;
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `${baseUrl}/sections-service/v1/cards/novels/${novelId}`
        );
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (novelId) {
      fetchData();
    }
  }, [baseUrl,novelId]);

  return (
    <>
      {data && (
        <>
          <NovelDatailHeader
            title={data.title}
            author={data.author}
            genre={data.genre}
            serializationStatus={data.serializationStatus}
            serializationDays={data.serializationDays}
          />
          <NovelDetailInfo
            views={data.views}
            starRating={data.starRating}
            episodeCount={data.episodeCount}
            thumbnail={data.thumbnail}
          />
          <NovelTages tags={data.tags} />
          <NovelDetailMenu
            novelId={novelId}
            description={data.description}
            authorComment={data.authorComment}
          />
        </>
      )}
      <DetailFooter />
    </>
  );
}
