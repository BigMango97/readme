import { NextPageWithLayout } from "./_app";
import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import MainLanking from "@/components/pages/main/MainLanking";
import DetailTitle from "@/components/ui/DetailTitle";
import Layout from "@/components/layouts/layout";
import NovelCard from "@/components/ui/NovelCard";
import MainSchedule from "@/components/pages/main/MainSchedule";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MainBestItem />
      <MainEvent thumbnail={"/assets/images/dummy/bestItem01.png"} />
      {/* <MainLanking />
      <MainLanking />
      <MainLanking />
      <MainLanking />
      <MainLanking /> */}
      <MainSchedule />
      <MainSchedule />
      <MainSchedule />
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
