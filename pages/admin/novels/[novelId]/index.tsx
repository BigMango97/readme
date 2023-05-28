import React, { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import NovelDetail from "@/components/pages/admin/NovelDetail";
import EpisodeList from "@/components/pages/admin/EpisodeList";

const novelDetail: NextPageWithLayout = () => {
  return (
    <>
      <NovelDetail />
      <EpisodeList />
    </>
  );
};
novelDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default novelDetail;
