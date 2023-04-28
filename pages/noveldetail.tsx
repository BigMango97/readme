import React, { useEffect } from "react";
import Image from "next/image";
import NovelDatailHeader from "@/components/pages/noveldetail/NovelDatailHeader";
import NovelDetailInfo from "@/components/pages/noveldetail/NovelDetailInfo";
import NovelDetailMenu from "@/components/pages/noveldetail/NovelDetailMenu";
import TagUi from "@/components/ui/TagUi";
import NovelIntroduce from "@/components/pages/noveldetail/NovelIntroduce";
import DetailFooter from "@/components/layouts/DetailFooter";
import { useState } from "react";
export default function Noveldetail() {
  const [data,setData] = useState(0);

  return (
    <>
      <NovelDatailHeader />
      <NovelDetailInfo/>
      <NovelDetailMenu/>
      <DetailFooter/>
    </>
  );
}
