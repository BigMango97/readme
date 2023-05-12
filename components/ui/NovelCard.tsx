import React from "react";
import style from "@/components/ui/NovelCard.module.css";
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
}
export default function NovelCard({
  thumbnail,
  serializationStatus,
  genre,
  title,
  author,
  starRating,
  novelId,
  grade,
  newChecking,
}: Props) {
  const router = useRouter();
  return (
    <div
      className={style.allNovelCard}
      onClick={() => router.push(`/noveldetail/${novelId}`)}
    >
      <div className={style.allNovelImgContainer}>
        <div className={style.allCardImg}>
          <Image src={thumbnail} alt={"이미지"} width={500} height={500} />
        </div>
        {newChecking == true ? (
          <div className={style.cardNewIcon}>
            <Image
              src={"/assets/images/icons/NewIcon.svg"}
              alt={"이미지"}
              width={30}
              height={30}
            />
          </div>
        ) : (
          ""
        )}

        <div className={style.ageCheck}>
          {grade === 19 ? (
            <p style={{ backgroundColor: "red", color: "white" }}>{grade}</p>
          ) : grade === 0 ? (
            <p
              style={{
                fontSize: "1px",
                backgroundColor: "green",
                color: "white",
              }}
            >
              All
            </p>
          ) : (
            <p>{grade}</p>
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
          <span>123</span>
        </div>
      </div>
    </div>
  );
}
