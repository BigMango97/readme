import Layout from "@/components/layouts/layout";
import { NextPageWithLayout } from "./_app";
import TagUi from "@/components/ui/TagUi";
import AllNovelMenu from "@/components/pages/novel/AllNovelMenu";
import AllNovelCard from "@/components/pages/novel/AllNovelCard";
const novel: NextPageWithLayout = () => {
  return (
    <>
      <AllNovelMenu />
      <AllNovelCard/>
    </>
  );
};

novel.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default novel;
