import { NextPageWithLayout } from "./_app";
import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import Layout from "@/components/layouts/layout";
import React from "react";
import MainScheduleContainer from "@/components/pages/main/MainScheduleContainer";
import axios from "axios";
import { useQuery } from "react-query";

const BaseUrl = "43.200.189.164:8000";
const scheduleTitleData = async () => {
  const response = await axios.get(
    `http://${BaseUrl}/sections-service/v1/schedules`
  );
  return response.data;
};

const Home: NextPageWithLayout = () => {
  const scheduleQuery = useQuery(["scheduleTitleData"], scheduleTitleData, {
    staleTime: 3 * 60 * 1000,
    cacheTime: 5 * 60 * 1000, // 5분 (밀리초 단위)
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
