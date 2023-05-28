import React from "react";
import NovelList from "@/components/pages/admin/NovelList";
import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "../_app";
import CardList from "@/components/pages/admin/CardList";

import { useRouter } from "next/router";
import NovelSearch from "@/components/pages/admin/NovelSearch";

import ScheduleManage from "@/components/pages/admin/ScheduleManage";

const Main: NextPageWithLayout = () => {
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
        <NovelList />
      )}
    </>
  );
};

Main.getLayout = function getLayout(page: React.ReactNode) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default Main;
