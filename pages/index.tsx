import { NextPageWithLayout } from "./_app";

import { useQuery } from "react-query";
import React from "react";

import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import Layout from "@/components/layouts/layout";
import MainScheduleContainer from "@/components/pages/main/MainScheduleContainer";
import axios from "@/configs/axiosConfig";
import RankingContainer from "@/components/pages/main/RankingContainer";

const scheduleTitleData = async () => {
  const response = await axios.get(`/sections-service/v1/schedules`);
  return response.data;
};
const BestNovelData = async (bestId: number) => {
  const response = await axios.get(
    `/sections-service/v1/cards/novels/${bestId}`
  );
  return response.data;
};

const eventNovelData = async (eventId: number) => {
  const response = await axios.get(
    `/sections-service/v1/cards/novels/${eventId}`
  );
  return response.data;
};

const fetchBestNovelId = async () => {
  const response = await axios.get(`/novels-service/v1/main`);
  return response.data;
};

const fetchEventNovelId = async () => {
  const response = await axios.get(`/novels-service/v1/main/event`);
  return response.data;
};
const Home: NextPageWithLayout = () => {
  const scheduleQuery = useQuery(["scheduleTitleData"], scheduleTitleData, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
  const scheduleTitleResult = scheduleQuery?.data?.data;

  const bestDataQuery = useQuery(["bestIdData"], fetchBestNovelId, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
  const bestId = bestDataQuery?.data?.data?.id;
  const bestImage = bestDataQuery?.data?.data?.mainImage;
  const bestNovelQuery = useQuery(
    ["bestNovelData", bestId],
    () => BestNovelData(bestId),
    {
      enabled: !!bestId,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
  const bestNovelDataResult = bestNovelQuery?.data?.data;

  const eventDataQuery = useQuery(["eventIdData"], fetchEventNovelId, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });
  const eventId = eventDataQuery?.data?.data?.id;
  const eventImage = eventDataQuery?.data?.data?.mainImage;

  const eventNovelQuery = useQuery(
    ["eventNovelData", eventId],
    () => eventNovelData(eventId),
    {
      enabled: !!eventId,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
  const eventNovelDataResult = eventNovelQuery?.data?.data;

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
