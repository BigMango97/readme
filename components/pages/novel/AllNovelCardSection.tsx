import React, { useState } from "react";
import Image from "next/image";
import { allNovelCardType } from "@/types/model/mainDataType";
import style from "@/components/pages/novel/AllNovelCardSection.module.css";
import NovelCardItem from "@/components/ui/NovelCardItem";
import NovelListItem from "@/components/ui/NovelListItem";
import { allDetailDatatype } from "@/types/model/mainDataType";
interface Props {
  data: allDetailDatatype[];
  totalElements: number;
}
export default function AllNovelCardSection({ data, totalElements }: Props) {
  const [viewerType, setViewerType] = useState<"card" | "list">("card");
  const handleViewerType = (type: "card" | "list") => {
    setViewerType(type);
  };
  return (
    <>
      <div className={style.container}>
        <div>소설 {totalElements}건</div>
        <div className={style.allNovelTotalIcon}>
          <Image
            src="/assets/images/icons/book-open.svg"
            alt="left-arrow"
            width={20}
            height={20}
            style={{
              filter: viewerType === "card" ? "none" : "grayscale(1)",
              cursor: "pointer",
            }}
            onClick={() => handleViewerType("card")}
          />
          <Image
            src="/assets/images/icons/book.svg"
            alt="left-arrow"
            width={20}
            height={20}
            style={{
              filter: viewerType === "list" ? "none" : "grayscale(1)",
              cursor: "pointer",
            }}
            onClick={() => handleViewerType("list")}
          />
        </div>
      </div>
      {viewerType == "card" ? (
        <div className={style.novelContainer}>
          {data &&
            data.map((item, index) => (
              <NovelCardItem
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
                imgSize="50%"
              />
            ))}
        </div>
      ) : (
        <div className={style.novelContainer}>
          {data &&
            data.map((item, index) => (
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
            ))}
        </div>
      )}
    </>
  );
}
