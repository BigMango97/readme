import React from "react";
import { useQuery,UseQueryResult } from "react-query";
import { useRouter } from "next/router";

import NovelViewer from "@/components/pages/viewer/NovelViewer";
import ViewerTop from "@/components/pages/viewer/ViewerTop";
import ViewerBottom from "@/components/pages/viewer/ViewerBottom";
import { episodeDetailFetch } from "../api/novel-service";
import { episodeDetailFetchType } from "@/types/service/novel-service";
import { emojiFetch } from "../api/batch-service";

interface ErrorType extends Error {
  message: string;
}
export default function ViewerPage() {
  const router = useRouter();
  const episodeId = Number(router.asPath.split("/")[2]);
 
  const {
    isLoading,
    isError,
    data,
    error,
  }: UseQueryResult<episodeDetailFetchType> = useQuery(
    ["episodeid", episodeId],
    () => episodeDetailFetch(episodeId),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: ErrorType) => {
        console.log(error.message);
      },
      enabled: !!episodeId,
    }
  );
  const episodeDetailDataResult =data?.data;


  const { data: emojiDataResult } = useQuery(
    ["emojiData", episodeId],
    () => emojiFetch(episodeId),
    {
      retry: 3,
      enabled: !!episodeId,
    }
  );
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
