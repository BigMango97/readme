import React from "react";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import NovelTages from "@/components/pages/noveldetail/NovelTages";
import { allDetailDatatype } from "@/types/model/mainDataType";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function Novel() {
  const [data, setData] = useState<allDetailDatatype>();
  const router = useRouter();
  const NOVELID = router.asPath.split("/")[2];

  useEffect(() => {
    axios
      .get(
        `http://43.200.189.164:8000/sections-service/v1/cards/novels/${NOVELID}`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, []);
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
        </>
      )}
      <NovelDetailMenu />
      <DetailFooter />
    </>
  );
}
