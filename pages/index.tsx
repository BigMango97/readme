import Layout from "@/components/layouts/layout";
import { NextPageWithLayout } from "./_app";
import MainBestItem from "@/components/pages/main/MainBestItem";

const Home: NextPageWithLayout = () => {

  return (
    <>
      <MainBestItem/>
      {/*todo: create eventBanner */}
    </>
  )
}

Home.getLayout = function getLayout(page: React.ReactNode) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Home