import React, { useState } from "react";
import Image from "next/image";
import { allNovelCardType } from "@/types/model/mainDataType";
import style from "@/components/pages/novel/AllNovelCardSection.module.css";
import NovelCardItem from "@/components/ui/NovelCardItem";
import NovelListItem from "@/components/ui/NovelListItem";
interface Props {
  data: { data: allNovelCardType };
}
export default function AllNovelCardSection({ data }: Props) {
  const [viewerType, setViewerType] = useState<"card" | "list">("card");
  const handleViewerType = (type: "card" | "list") => {
    setViewerType(type);
  };
  return (
    <>
      <div className={style.container}>
        <div>소설 {data.data.totalElements}건</div>
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
          {data.data.novelCardsData &&
            data.data.novelCardsData.map((item: any) => (
              <NovelCardItem
                key={item.novelId}
                thumbnail={item.thumbnail}
                title={item.title}
                serializationStatus={item.serializationStatus}
                author={item.author}
                starRating={item.starRating}
                genre={item.genre}
                novelId={item.novelId}
                grade={item.grade}
                newChecking={item.newChecking}
              />
            ))}
        </div>
      ) : (
        <div className={style.novelContainer}>
          {data.data.novelCardsData &&
            data.data.novelCardsData.map((item: any) => (
              <NovelListItem
                key={item.novelId}
                thumbnail={item.thumbnail}
                title={item.title}
                serializationStatus={item.serializationStatus}
                author={item.author}
                starRating={item.starRating}
                genre={item.genre}
                novelId={item.novelId}
                grade={item.grade}
                newChecking={item.newChecking}
              />
            ))}
        </div>
      )}
    </>
  );
}
