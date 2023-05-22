import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import NovelTages from "@/components/pages/noveldetail/NovelTages";
import { allDetailDatatype } from "@/types/model/mainDataType";

export default function Novel() {
  const [data, setData] = useState<allDetailDatatype>();
  const router = useRouter();
  const [novelId, setNovelId] = useState(Number(router.query.novelId));
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get(
          `http://43.200.189.164:8000/sections-service/v1/cards/novels/${novelId}`
        );
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
    if (novelId) {
      fetchData();
    }
  }, [novelId]);

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
