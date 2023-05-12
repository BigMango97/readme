import React from "react";
import Image from "next/image";
import style from "@/components/ui/NovelCard.module.css";

interface Props {
  styleType: "card" | "list" | "event";
  thumbnail: string;
  serializationStatus: string;
  title: string;
  author: string;
  starRating: number;
  genre: string;
}
export default function NovelCard({
  styleType,
  thumbnail,
  serializationStatus,
  genre,
  title,
  author,
  starRating,
}: Props) {
  return (
    <div
      className={
        styleType === "card"
          ? style.allNovelCard
          : styleType === "list"
          ? style.allNovelList
          : style.allNovelEvent
      }
    >
      <div className={style.allNovelImgContainer}>
        <div
          className={
            styleType === "card" || styleType === "event"
              ? style.allCardImg
              : style.allListImg
          }
        >
          <Image src={thumbnail} alt={"이미지"} width={500} height={500} />
        </div>
        <div
          className={
            styleType === "card" || styleType === "event"
              ? style.cardNewIcon
              : style.listNewIcon
          }
        >
          <Image
            src={"/assets/images/icons/NewIcon.svg"}
            alt={"이미지"}
            width={30}
            height={30}
          />
    
        </div>
        <div className={style.ageCheck}><span>19</span></div>
      </div>
      <div className={styleType === "list" ? style.allNovelInfo : ""}>
        <div className={style.allNovelStatus}>{serializationStatus}</div>
        <div className={style.allNovelTitle}>
          <p>{title}</p>
        </div>
        <div className={style.allNovelAuthor}>
          {author} | {genre}
        </div>
        <div className={style.allNovelStarpoint}>
          <Image
            src={"/assets/images/icons/star.svg"}
            alt={"이미지"}
            width={15}
            height={15}
          />
          <span>{starRating}</span>
          <Image
            src={"/assets/images/icons/list.svg"}
            alt={"이미지"}
            width={15}
            height={15}
          />
          <span>123</span>
        </div>
      </div>
    </div>
  );
}
