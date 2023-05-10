import NovelLayout from "@/components/layouts/NovelLayout";
import MainBestItem from "@/components/pages/main/MainBestItem";
import AllNovelTotalCount from "@/components/pages/novel/AllNovelTotalCount";
import AllNovelCardSection from "@/components/pages/novel/AllNovelCardSection";
import { NextPageWithLayout } from "@/pages/_app";

const Novel: NextPageWithLayout = () => {
  return (
    <>
      <AllNovelTotalCount />
      <AllNovelCardSection />
    </>
  );
};

Novel.getLayout = function getLayout(page: React.ReactNode) {
  return <NovelLayout>{page}</NovelLayout>;
};

export default Novel;
