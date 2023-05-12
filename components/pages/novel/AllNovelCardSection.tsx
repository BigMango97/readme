import React from "react";
import style from "@/components/pages/novel/AllNovelCardSection.module.css";
import NovelCard from "@/components/ui/NovelCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { allNovelCardType } from "@/types/model/mainDataType";
import Image from "next/image";
import NovelList from "@/components/ui/NovelList";
export default function AllNovelCardSection() {
  const [data, setData] = useState<allNovelCardType>();
  const router = useRouter();
  const { category, subCategory }: any = router.query;

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

  const [type, setType] = useState<boolean>(true);

  const typetrueHandler = () => {
    setType(true);
  };
  const typefalseHandler = () => {
    setType(false);
  };
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
            style={{ filter: type ? "none":"grayscale(1)"}}

          />

          <Image
            src="/assets/images/icons/book.svg"
            alt="left-arrow"
            width={20}
            height={20}
            priority
            onClick={() => typefalseHandler()}
            style={{ filter: type ?  "grayscale(1)" :"none"}}

          />
        </div>
      </div>
      {type ? (
        <div className={style.novelContainer}>
          {data &&
            data.novelCardsData.map((item) => (
              <NovelCard
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
              <NovelList
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
