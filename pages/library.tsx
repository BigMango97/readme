import { NextPageWithLayout } from "./_app";
import MyBooks from "@/components/pages/library/MyBooks";
import LibraryTop from "@/components/pages/library/LibraryTop";
import React from "react";
import Layout from "@/components/layouts/layout";

const Library: NextPageWithLayout = () => {
  return (
    <>
      <LibraryTop />
      <MyBooks />
    </>
  );
};

Library.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Library;
