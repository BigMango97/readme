import { useQuery, UseQueryResult, useQueryClient } from "react-query";
import { useRouter } from "next/router";

import NovelViewer from "@/components/pages/viewer/NovelViewer";
import ViewerTop from "@/components/pages/viewer/ViewerTop";
import ViewerBottom from "@/components/pages/viewer/ViewerBottom";
import { episodeDetailFetch } from "../api/novel-service";
import { episodeDetailFetchType } from "@/types/service/novel-service";
import { emojiFetch } from "../api/batch-service";
import { useEffect, useState, useRef } from "react";

interface ErrorType extends Error {
  message: string;
}

export default function ViewerPage() {
  const { query } = useRouter();
  const episodeId = Number(query.episodeId);
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url: any) => {
      closeEventSource();

      const episodeId = getEpisodeIdFromUrl(url);
      if (episodeId) {
        initializeEventSource(episodeId);
      }
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      closeEventSource();
    };
  }, []);

  const getEpisodeIdFromUrl = (url: any) => {
    const match = url.match(/viewer\/(\d+)/);
    return match ? Number(match[1]) : null;
  };

  useEffect(() => {
    if (query.episodeId) {
      const episodeId = Number(query.episodeId);

      if (!isNaN(episodeId)) {
        initializeEventSource(episodeId);
      } else {
        console.error("Invalid episodeId:", query.episodeId);
      }
    }

    return () => {
      closeEventSource();
    };
  }, [query]);
  const queryClient = useQueryClient();
  const eventSource = useRef<EventSource | null>(null);

  const initializeEventSource = (episodeId: number) => {
    closeEventSource();

    const newEventSource = new EventSource(
      `https://api.readme.life/novels-service/v1/episodes/getEmitter/${episodeId}`
    );

    newEventSource.onopen = () => {
      console.log("Connection to server opened.");
    };

    newEventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      newEventSource.close();
    };

    newEventSource.addEventListener("sse", (event) => {
      const message = event.data;
      const regex =
        /EmojiStatusDto\(episodeId=(\d+), episodeRow=(\d+), emoji=(\d+)\)/;
      const match = message.match(regex);

      if (match) {
        const newEmojiData = {
          episodeId: parseInt(match[1], 10),
          episodeRow: parseInt(match[2], 10),
          emoji: parseInt(match[3], 10),
        };

        const queryData = queryClient.getQueryData<any[]>([
          "emojiData",
          episodeId,
        ]);
        const oldData = Array.isArray(queryData) ? [...queryData] : [];

        const existingDataIndex = oldData.findIndex(
          (item) =>
            item.episodeId === newEmojiData.episodeId &&
            item.episodeRow === newEmojiData.episodeRow
        );

        if (existingDataIndex !== -1) {
          oldData[existingDataIndex] = newEmojiData;
        } else {
          oldData.push(newEmojiData);
        }
        queryClient.setQueryData(["emojiData", episodeId], [...oldData]);
        // queryClient.invalidateQueries(["emojiData", episodeId]);
      }
    });

    eventSource.current = newEventSource;
  };

  const closeEventSource = () => {
    if (eventSource.current) {
      console.log("closeclose");
      eventSource.current.close();
      eventSource.current = null;
    }
  };

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
        console.log("data", data);
      },
      onError: (error: ErrorType) => {
        console.log(error.message);
      },
      enabled: !!episodeId,
    }
  );
  const episodeDetailDataResult = data?.data;

  const {
    data: emojiQuery,
    isLoading: emojiLoading,
    isError: emojiError,
  } = useQuery(["emojiData", episodeId], () => emojiFetch(episodeId), {
    enabled: !!episodeId,
  });

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
            emojiData={emojiQuery.data}
          />
          <ViewerBottom
            novelId={episodeDetailDataResult.novelId}
            title={episodeDetailDataResult.title}
            prevId={episodeDetailDataResult.prevId}
            prevFree={episodeDetailDataResult.prevFree}
            prevRead={episodeDetailDataResult.prevRead}
            nextId={episodeDetailDataResult.nextId}
            nextFree={episodeDetailDataResult.nextFree}
            nextRead={episodeDetailDataResult.nextRead}
          />
        </>
      )}
    </>
  );
}
