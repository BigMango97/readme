import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import NovelTages from "@/components/pages/noveldetail/NovelTages";
import Config from "@/configs/config.export";
import { useQuery } from "react-query";
import { useEffect } from "react";
export default function NovelDetail() {
  const router = useRouter();
  const [novelId, setNovelId] = useState(Number(router.query.novelId));
  const novelbyIdData = async () => {
    const baseUrl = Config().baseUrl;
    const response = await axios.get(
      `${baseUrl}/sections-service/v1/cards/novels/${novelId}`
    );
    return response.data;
  };
  const novelbyIdDataQuery = useQuery(
    ["novelbyIdData", novelId],
    novelbyIdData,
    {
      enabled: !!novelId,
    }
  );
  useEffect(() => {
    setNovelId(Number(router.query.novelId));
  }, [router.query.novelId]);

  const novelbyIdDataResult = novelbyIdDataQuery?.data?.data;


  return (
    <>
      {novelbyIdDataResult && (
        <>
          <NovelDatailHeader
            title={novelbyIdDataResult.title}
            author={novelbyIdDataResult.author}
            genre={novelbyIdDataResult.genre}
            serializationStatus={novelbyIdDataResult.serializationStatus}
            serializationDays={novelbyIdDataResult.serializationDays}
          />
          <NovelDetailInfo
            views={novelbyIdDataResult.views}
            starRating={novelbyIdDataResult.starRating}
            episodeCount={novelbyIdDataResult.episodeCount}
            thumbnail={novelbyIdDataResult.thumbnail}
          />
          <NovelTages tags={novelbyIdDataResult.tags} />
          <NovelDetailMenu
            novelId={novelbyIdDataResult.novelId}
            description={novelbyIdDataResult.description}
            authorComment={novelbyIdDataResult.authorComment}
          />
        </>
      )}
      <DetailFooter/>
    </>
  );
}
