import React, { ReactElement, use, useEffect, useState } from "react";
import NovelList from "@/components/pages/admin/NovelList";
import AdminLayout from "@/components/layouts/AdminLayout";
import { NextPageWithLayout } from "../_app";
import ScheduleList from "@/components/pages/admin/ScheduleList";
import CardList from "@/components/pages/admin/CardList";

import { useRouter } from "next/router";
import NovelSearch from "@/components/pages/admin/NovelSearch";
import { createContext } from "react";
import NovelSelect from "@/components/ui/admin/NovelSelect";
import { novelInputType } from "@/types/admin/novelType";
import dayjs from "dayjs";
import { Select } from "antd";

const Main: NextPageWithLayout = () => {
  const router = useRouter();
  let currentTap = router.query.type;

  return (
    <>
      <NovelSearch />
      {currentTap === "3" ? (
        <CardList />
      ) : currentTap === "2" ? (
        <ScheduleList />
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
