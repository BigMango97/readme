import React from "react";
import { useQuery } from "react-query";

import { NextPageWithLayout } from "./_app";
import Layout from "@/components/layouts/layout";
import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import MainScheduleContainer from "@/components/pages/main/MainScheduleContainer";
import RankingContainer from "@/components/pages/main/RankingContainer";
import {
  scheduleQueryType,
  besteventNovelQueryType,
} from "@/types/service/section-service";
import {
  scheduleTitleFetch,
  BestNovelItemFetch,
  eventNovelItemFetch,
} from "./api/sections-service";
import { bestNovelIdFetch, eventNovelFetch } from "./api/novel-service";
import { besteventIdDataType } from "@/types/service/novel-service";

const queryOptions = {
  staleTime: 5 * 60 * 1000,
  cacheTime: 10 * 60 * 1000,
};

const Home: NextPageWithLayout = () => {
  //scheduleData
  const scheduleQuery = useQuery<scheduleQueryType[]>(
    ["scheduleTitleData"],
    scheduleTitleFetch,
    queryOptions
  );
  const scheduleTitleResult = scheduleQuery?.data;

  //bestItemData
  const bestDataQuery = useQuery<besteventIdDataType>(
    ["bestIdData"],
    bestNovelIdFetch,
    queryOptions
  );

  const bestId = bestDataQuery?.data?.data?.id;
  const bestImage = bestDataQuery?.data?.data?.mainImage || "";

  const bestNovelQuery = useQuery<besteventNovelQueryType>(
    ["bestNovelData", bestId],
    () => (bestId ? BestNovelItemFetch(bestId) : Promise.resolve(undefined)),
    {
      ...queryOptions,
      enabled: !!bestId,
    }
  );
  const bestNovelDataResult = bestNovelQuery.data;

  //eventItemData
  const eventDataQuery = useQuery<besteventIdDataType>(
    ["eventIdData"],
    eventNovelFetch,
    queryOptions
  );
  const eventId = eventDataQuery?.data?.data?.id;
  const eventImage = eventDataQuery?.data?.data?.mainImage || "";
  const eventNovelQuery = useQuery<besteventNovelQueryType>(
    ["eventNovelData", eventId],
    () => (eventId ? eventNovelItemFetch(eventId) : Promise.resolve(undefined)),
    {
      ...queryOptions,
      enabled: !!eventId,
    }
  );
  const eventNovelDataResult = eventNovelQuery?.data;

  return (
    <>
      {bestNovelDataResult && (
        <MainBestItem data={bestNovelDataResult} bestImage={bestImage} />
      )}
      <RankingContainer />
      {eventNovelDataResult && (
        <MainEvent data={eventNovelDataResult} eventImage={eventImage} />
      )}
      {scheduleTitleResult && (
        <MainScheduleContainer data={scheduleTitleResult} />
      )}
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
