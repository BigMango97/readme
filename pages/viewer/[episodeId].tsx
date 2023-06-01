import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

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
  const episodeId = Number(router.asPath.split("/")[2]);
  const [cookies] = useCookies(["uuid", "accessToken"]);
  const baseUrl = Config().baseUrl;
  const episodeDetailData = async (episodeid: number) => {
    const response = await axios.get(
      `${baseUrl}/novels-service/v1/episodes/${episodeid}`
    );
    return response;
  };

  const { isLoading, isError, data, error } = useQuery(
    ["episodeid", episodeId],
    () => episodeDetailData(episodeId),
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
      enabled: !!episodeId,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  const emojiData = async (episodeId: number) => {
    const response = await axios.get(
      `${baseUrl}/utils-service/v1/emoji/${episodeId}`,
      {
        headers: {
          uuid: cookies.uuid,
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      }
    );
    return response.data;
  };

  const { data: emojiDataResult } = useQuery(
    ["emojiData", episodeId],
    () => emojiData(episodeId),
    {
      retry: 3,
      enabled: !!episodeId,
    }
  );
  const episodeDetailDataResult: viewerData = data?.data;
  return (
    <>
      {episodeDetailDataResult && (
        <>
          <ViewerTop
            novelId={episodeDetailDataResult.novelId}
            title={episodeDetailDataResult.title}
            novelsTitle={episodeDetailDataResult.novelsTitle}
            registration={episodeDetailDataResult.registration}
          />
          <NovelViewer
            viewerData={episodeDetailDataResult.content}
            emojiData={emojiDataResult?.data || []} 
          />
          <ViewerBottom
            novelId={episodeDetailDataResult.novelId}
            title={episodeDetailDataResult.title}
          />
        </>
      )}
    </>
  );
}
