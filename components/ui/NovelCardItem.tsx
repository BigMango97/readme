import React from "react";
import style from "@/components/ui/NovelCardItem.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
interface Props {
  thumbnail: string;
  serializationStatus: string;
  title: string;
  author: string;
  starRating: number;
  genre: string;
  novelId?: number;
  grade: number;
  newChecking: boolean;
  imgSize:string;
  episodeCount:number;

}
export default function NovelCardItem({
  thumbnail,
  serializationStatus,
  genre,
  title,
  author,
  starRating,
  novelId,
  grade,
  newChecking,
  imgSize,
  episodeCount
}: Props) {
  const router = useRouter();
  const IS_READABLE_BY_All = 0;
  const IS_NINETEEN_PLUS = 19;
  return (
    <div
      className={style.allNovelCard}
      style={{width:imgSize}}
      onClick={() => router.push(`/noveldetail/${novelId}?menu=작품소개`)}
    >
      <div className={style.allNovelImgContainer}>
        <div className={style.allCardImg}>
          <Image src={thumbnail} alt={"이미지"} width={500} height={500} />
        </div>
        {newChecking && (
          <div className={style.cardNewIcon}>
            <Image
              src={"/assets/images/icons/NewIcon.svg"}
              alt={"이미지"}
              width={30}
              height={30}
            />
          </div>
        )}
        <div className={style.ageCheck}>
          {grade === IS_NINETEEN_PLUS ? (
            <p className={style.nineteenCheck}>{grade}</p>
          ) : grade === IS_READABLE_BY_All ? (
            <p className={style.allCheck}>All</p>
          ) : (
            <p className={style.basicCheck}>{grade}</p>
          )}
        </div>
      </div>
      <div>
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
          <span>{episodeCount}</span>
        </div>
      </div>
    </div>
  );
}
