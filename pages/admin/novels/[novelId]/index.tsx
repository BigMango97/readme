import React, { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "@/pages/_app";
import NovelDetail from "@/components/pages/admin/NovelDetail";
import EpisodeList from "@/components/pages/admin/EpisodeList";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Config from "@/configs/config.export";

const novelDetail: NextPageWithLayout = ({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <NovelDetail />
      <EpisodeList data={data} />
    </>
  );
};
novelDetail.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};
export default novelDetail;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const novelId = context.query.novelId;
  const baseUrl = Config().baseUrl;
  const res = await fetch(
    `${baseUrl}/novels-service/v1/admin/episodes?novelId=${novelId}&page=0`
  );
  const data = await res.json();
  return {
    props: {
      data: data,
    },
  };
};
