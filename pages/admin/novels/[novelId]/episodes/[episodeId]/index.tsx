import React, { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import EpisodeDetail from "@/components/pages/admin/EpisodeDetail";
import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";

const episodeDetail: NextPageWithLayout = () => {
  return <EpisodeDetail />;
};
episodeDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default episodeDetail;
