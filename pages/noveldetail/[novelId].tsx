import React from "react";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import DetailFooter from "@/components/layouts/DetailFooter";
import NovelTages from "@/components/pages/noveldetail/NovelTages";
export default function Novel() {
  return (
    <>
      <NovelDatailHeader />
      <NovelDetailInfo />
      <NovelTages />
      <NovelDetailMenu />
      <DetailFooter />
    </>
  );
}
