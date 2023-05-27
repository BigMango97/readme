import { NextPageWithLayout } from "./_app";

import { useQuery } from "react-query";
import React from "react";

import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import Layout from "@/components/layouts/layout";
import MainScheduleContainer from "@/components/pages/main/MainScheduleContainer";
import MainLanking from "@/components/pages/main/MainLanking";
import axios from "@/configs/axiosConfig";
const scheduleTitleData = async () => {
  const response = await axios.get(`/sections-service/v1/schedules`);
  return response.data;
};

const Home: NextPageWithLayout = () => {
  const scheduleQuery = useQuery(["scheduleTitleData"], scheduleTitleData, {
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000, // 10분 (밀리초 단위)
  });
  const scheduleTitleResult = scheduleQuery?.data?.data;
  return (
    <>
      <MainBestItem />
      <MainEvent thumbnail={"/assets/images/dummy/bestItem01.png"} />
      {scheduleTitleResult && (
        <MainScheduleContainer data={scheduleTitleResult} />
      )}
      {/* <MainLanking /> */}
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
