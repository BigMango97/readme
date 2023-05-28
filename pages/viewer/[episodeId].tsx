import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Config from "@/configs/config.export";
import { viewerData } from "@/types/model/mainDataType";
import NovelViewer from "@/components/pages/viewer/NovelViewer";
import ViewerTop from "@/components/pages/viewer/ViewerTop";
import ViewerBottom from "@/components/pages/viewer/ViewerBottom";

interface ErrorType extends Error {
  message: string;
}
export default function ViewerPage() {
  const router = useRouter();
  const episodeid = router.asPath.split("/")[2];

  const baseUrl = Config().baseUrl;
  const episodeDetailData = async (episodeid: any) => {
    const response = await axios.get(
      `${baseUrl}/novels-service/v1/episodes/${episodeid}`
    );
    return response;
  };

  const { isLoading, isError, data, error } = useQuery(
    ["episodeid", episodeid],
    () => episodeDetailData(episodeid),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: ErrorType) => {
        console.log(error.message);
      },
      select: (data) => {
        return data.data;
      },
      enabled: !!episodeid,
      cacheTime: Infinity,
    }
  );
  const episodeDetailDataResult: viewerData = data?.data;

  return (
    <>
      {episodeDetailDataResult && (
        <>
          <ViewerTop
            title={episodeDetailDataResult.title}
            registration={episodeDetailDataResult.registration}
          />
          <NovelViewer viewerData={episodeDetailDataResult.content} />
          <ViewerBottom />
        </>
      )}
    </>
  );
}
