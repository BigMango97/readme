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

export default function NovelDetail() {
import { useCookies } from "react-cookie";
import Login from "../login";
import isLogin from "@/configs/isLogin";

const [cookies] = useCookies(["accessToken"]);

  useEffect(() => {
    if (!cookies.accessToken) {
      router.push("/login");
    }
  }, []);
  const [data, setData] = useState<allDetailDatatype>();
  const router = useRouter();
  const [novelId, setnovelId] = useState(Number(router.query.novelId));

  const novelbyIdData = async () => {
    const baseUrl = Config().baseUrl;
    const response = await axios.get(
      `${baseUrl}/sections-service/v1/cards/novels/${novelId}`
    );
    return response.data;
  };
  const novelbyIdDataQuery = useQuery(
    ["novelbyIdData", novelbyIdData, "novelId", novelId],
    novelbyIdData,
    {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000, // 5분 (밀리초 단위)
    }
  );
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
            novelId={novelId}
            description={novelbyIdDataResult.description}
            authorComment={novelbyIdDataResult.authorComment}
          />
        )}
    </>
  );
}
