import React from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { NextPageWithLayout } from "./_app";
import LikeBooks from "@/components/pages/library/LikeBooks";
import LibraryLayout from "@/components/layouts/LibraryLayout";
import RecentBooks from "@/components/pages/library/RecentBooks";
import PurchasedBooks from "@/components/pages/library/PurchasedBooks";

const Library: NextPageWithLayout = () => {
  const router = useRouter();
  const currentTap: string | undefined = router.query.id?.toString();
  return (
    <>
      <Head>
        {currentTap === "1" && <title> {`최근 본 소설 | ReadMe`}</title>}
        {currentTap === "2" && <title> {`좋아요 | ReadMe`}</title>}
        {currentTap === "3" && <title> {`구매완료 | ReadMe`}</title>}
        <meta name="description" content="로그인 페이지 입니다." />
      </Head>

      {currentTap === "3" ? ( //구매한 소설
        <PurchasedBooks />
      ) : currentTap === "2" ? ( //좋아요한 소설
        <LikeBooks />
      ) : (
        //최근 본 소설
        <RecentBooks />
      )}
    </>
  );
};
export default Library;

Library.getLayout = function getLayout(page: React.ReactNode) {
  return <LibraryLayout>{page}</LibraryLayout>;
};
