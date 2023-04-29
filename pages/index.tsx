import Layout from "@/components/layouts/layout";
import { NextPageWithLayout } from "./_app";
import MainBestItem from "@/components/pages/main/MainBestItem";
import MainEvent from "@/components/pages/main/MainEvent";
import MainLanking from "@/components/pages/main/MainLanking";
import DetailTitle from "@/components/ui/DetailTitle";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <MainBestItem />
      <MainEvent thumbnail={"/assets/images/dummy/bestItem01.png"} />
      <DetailTitle
        title={"이번주 소설 랭킹"}
        size={19.2}
        leftsize={"1.5rem"}
        fontweight={800}
        color={"#5841E0"}
        bottomsize={"1.2rem"}
      />
      <MainLanking />
      <MainLanking />
      <MainLanking />
      <MainLanking />
      <MainLanking />
    </>
  );
};

Home.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Home;
