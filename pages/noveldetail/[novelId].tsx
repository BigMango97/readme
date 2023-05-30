import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import NovelTages from "@/components/pages/noveldetail/NovelTages";
import Config from "@/configs/config.export";

export default function NovelDetail() {
  const router = useRouter();
  const novelId = Number(router.query.novelId);
  const novelbyIdData = async () => {
    const baseUrl = Config().baseUrl;
    const response = await axios.get(
      `${baseUrl}/sections-service/v1/cards/novels/${novelId}`
    );
    return response.data;
  };
  const { data, error, isLoading } = useQuery(
    ["novelbyIdData", novelId],
    novelbyIdData,
    {
      enabled: !!novelId,
    }
  );
  const novelbyIdDataResult = data?.data;

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
      <DetailFooter />
    </>
  );
}
