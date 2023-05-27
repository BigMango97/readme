import React, { ReactElement, use, useEffect, useState } from "react";
import NovelList from "@/components/pages/admin/NovelList";
import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "../_app";
import ScheduleList from "@/components/pages/admin/ScheduleManage";
import CardList from "@/components/pages/admin/CardList";

import { useRouter } from "next/router";
import NovelSearch from "@/components/pages/admin/NovelSearch";
import { createContext } from "react";
import NovelSelect from "@/components/ui/admin/NovelSelect";
import { novelInputType } from "@/types/admin/novelType";
import dayjs from "dayjs";
import { Select } from "antd";
import ScheduleManage from "@/components/pages/admin/ScheduleManage";
import { GetServerSideProps } from "next";
import Config from "@/configs/config.export";

const Main: NextPageWithLayout = ({ data }: any) => {
  const router = useRouter();
  let currentTap = router.query.menu;

  return (
    <>
      <NovelSearch />
      {currentTap === "card" ? (
        <CardList />
      ) : currentTap === "schedule" ? (
        <ScheduleManage />
      ) : (
        <NovelList data={data} />
      )}
    </>
  );
};

Main.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Main;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const baseUrl = Config().baseUrl;

  const search = context.query.search ? context.query.search : "";
  const select = context.query.select;
  let url = "";
  if (select === "title") {
    url = `${baseUrl}/novels-service/v1/admin/novels?title=${search}`;
  } else if (select === "author") {
    url = `${baseUrl}/novels-service/v1/admin/novels?author=${search}`;
  } else {
    url = `${baseUrl}/novels-service/v1/admin/novels`;
  }
  const res = await fetch(url);
  const data = await res.json();

  return {
    props: {
      data: data,
    },
  };
};
