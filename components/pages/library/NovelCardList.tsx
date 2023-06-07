import React, { useState } from "react";

import {
  allDetailDatatype,
  allNovelCardType,
} from "@/types/model/mainDataType";

import style from "@/components/pages/library/NovelCardList.module.css";
import NovelListItem from "@/components/ui/NovelListItem";

import { useRouter } from "next/router";
import { purchasedNovelType } from "@/types/user/libraryType";
import PurchasedListItem from "./PurchasedListItem";
interface Props {
  novelData: allDetailDatatype[];
  purchasedData: purchasedNovelType[];
  totalElements: number;
}
export default function NovelCardList({
  novelData,
  purchasedData,
  totalElements,
}: Props) {
  const router = useRouter();
  const currentTap = router.query.id;
  let info = "최근 본 소설이 없습니다";
  if (currentTap === "2") info = "좋아요 한 소설이 없습니다";
  if (currentTap === "3") info = "구매한 소설이 없습니다";

  console.log("novelData ", novelData);
  console.log("purchasedData ", purchasedData);
  console.log("info ", info);
  return (
    <>
      <div className={style.container}>
        <span>소설 {totalElements}건</span>
      </div>
      <div className={style.novelContainer}>
        {currentTap === "3" && purchasedData.length !== 0 ? (
          purchasedData.map((item, index) => (
            <PurchasedListItem key={index} purchasedData={item} />
          ))
        ) : novelData.length !== 0 ? (
          novelData.map((item, index) => (
            <NovelListItem key={index} novelData={item} />
          ))
        ) : (
          <div className={style.empty}>
            <p>{info}</p>
          </div>
        )}
      </div>
    </>
  );
}
