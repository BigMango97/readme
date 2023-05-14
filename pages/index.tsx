import { NextPageWithLayout } from "./_app";
import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import Layout from "@/components/layouts/layout";
import React from "react";
import MainScheduleContainer from "@/components/pages/main/MainScheduleContainer";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MainBestItem />
      <MainEvent thumbnail={"/assets/images/dummy/bestItem01.png"} />
      <MainScheduleContainer />
      {/* <MainLanking /> */}
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
