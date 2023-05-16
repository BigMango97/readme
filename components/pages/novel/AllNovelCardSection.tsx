import React, { useEffect, useState } from "react";
import style from "@/components/pages/novel/AllNovelCardSection.module.css";
import NovelCardItem from "@/components/ui/NovelCardItem";
import NovelListItem from "@/components/ui/NovelListItem";

import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";
import { allNovelCardType } from "@/types/model/mainDataType";

export default function AllNovelCardSection() {
  const [data, setData] = useState<allNovelCardType>();
  const router = useRouter();
  const { category, subCategory }: any = router.query;

  const [viwerType, setViwerType] = useState<"card" | "list">("card");

  const typetrueHandler = () => {
    setViwerType("card");
  };
  const typefalseHandler = () => {
    setViwerType("list");
  };

  useEffect(() => {
    axios
      .get(
        `http://43.200.189.164:8000/sections-service/v1/cards/novels?pagination=0&category=${category}&subCategory=${subCategory}`
      )
      .then((res) => {
        setData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [category, subCategory]);

  return (
    <>
      <div className={style.container}>
        <div>소설 {data?.totalElements}건</div>
        <div className={style.allNovelTotalIcon}>
          <Image
            src="/assets/images/icons/book-open.svg"
            alt="left-arrow"
            width={20}
            height={20}
            priority
            onClick={() => typetrueHandler()}
            style={{ filter: viwerType ? "none" : "grayscale(1)" }}
          />

          <Image
            src="/assets/images/icons/book.svg"
            alt="left-arrow"
            width={20}
            height={20}
            priority
            onClick={() => typefalseHandler()}
            style={{ filter: viwerType ? "grayscale(1)" : "none" }}
          />
        </div>
      </div>
      {viwerType == "card" ? (
        <div className={style.novelContainer}>
          {data &&
            data.novelCardsData.map((item) => (
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
          {data &&
            data.novelCardsData.map((item) => (
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
