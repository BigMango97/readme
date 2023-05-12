import NovelLayout from "@/components/layouts/NovelLayout";
import AllNovelCardSection from "@/components/pages/novel/AllNovelCardSection";
import { NextPageWithLayout } from "@/pages/_app";

const Novel: NextPageWithLayout = () => {
  return (
    <>
      <AllNovelCardSection />
    </>
  );
};

Novel.getLayout = function getLayout(page: React.ReactNode) {
  return <NovelLayout>{page}</NovelLayout>;
};

export default Novel;