import React from "react";
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
import { GetServerSideProps } from "next";

interface ServerSideProps {
  scheduleTitleData: scheduleQueryType[];
  bestNovelData: besteventNovelQueryType;
  eventNovelData: besteventNovelQueryType;
  bestImage: string;
  eventImage: string;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const scheduleTitleData = await scheduleTitleFetch();
  const bestIdData = await bestNovelIdFetch();
  const eventIdData = await eventNovelFetch();

  const bestId = bestIdData?.data?.id;
  const eventId = eventIdData?.data?.id;

  let bestNovelData;
  let eventNovelData;

  if (bestId) {
    bestNovelData = await BestNovelItemFetch(bestId);
  }

  if (eventId) {
    eventNovelData = await eventNovelItemFetch(eventId);
  }

  return {
    props: {
      scheduleTitleData,
      bestNovelData,
      eventNovelData,
      bestImage: bestIdData?.data?.mainImage || "",
      eventImage: eventIdData?.data?.mainImage || "",
    },
  };
};

const Home: NextPageWithLayout<ServerSideProps> = ({
  scheduleTitleData,
  bestNovelData,
  eventNovelData,
  bestImage,
  eventImage,
}) => {
  return (
    <>
      {bestNovelData && (
        <MainBestItem data={bestNovelData} bestImage={bestImage} />
      )}
      {eventNovelData && (
        <MainEvent data={eventNovelData} eventImage={eventImage} />
      )}
      <RankingContainer />
      {scheduleTitleData && <MainScheduleContainer data={scheduleTitleData} />}
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
