import React, { useState } from "react";
import { allDetailDataListType } from "@/types/model/mainDataType";
import style from "@/components/pages/library/NovelCardList.module.css";
import NovelListItem from "@/components/ui/NovelListItem";
interface Props {
  data: allDetailDataListType | undefined;
  totalElements: number;
}
export default function NovelCardList({ data, totalElements }: Props) {
  return (
    <>
      <div className={style.container}>
        <span>소설 {totalElements}건</span>
      </div>
      <div className={style.novelContainer}>
        {data ? (
          data.allDetailDataList.map((item, index) => (
            <NovelListItem
              key={index}
              thumbnail={item.thumbnail}
              title={item.title}
              serializationStatus={item.serializationStatus}
              author={item.author}
              starRating={item.starRating}
              genre={item.genre}
              novelId={item.novelId}
              grade={item.grade}
              newChecking={item.newChecking}
              episodeCount={item.episodeCount}
            />
          ))
        ) : (
          <p>최근 본 소설이 없습니다</p>
        )}
      </div>
    </>
  );
}
