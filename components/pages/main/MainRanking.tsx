import React from "react";
import style from "@/components/pages/main/MainRanking.module.css";
import Image from "next/image";
import { novelRankingDataType } from "@/types/service/batch-service";
import Link from "next/link";
function MainRankingTitle({
  title,
  changeRanking,
}: {
  title: string;
  changeRanking: number;
}) {
  if (changeRanking > 0) {
    return (
      <div className={style.upImg}>
        <Image
          src={"/assets/images/icons/up.svg"}
          alt={"Up"}
          width={10}
          height={10}
          loading="lazy"
          placeholder="empty"
        />
        <span>{changeRanking}</span>
      </div>
    );
  } else if (changeRanking < 0) {
    return (
      <div className={style.downImg}>
        <Image
          src={"/assets/images/icons/down.svg"}
          alt={"Down"}
          width={10}
          height={10}
          loading="lazy"
          placeholder="empty"
        />
        <span>{Math.abs(changeRanking)}</span>
      </div>
    );
  } else if (changeRanking === 0) {
    return (
      <div className={style.notchangeImg}>
        <Image
          src={"/assets/images/icons/notchange.svg"}
          alt={"No change"}
          width={10}
          height={10}
          loading="lazy"
          placeholder="empty"
        />
      </div>
    );
  } else {
    return null;
  }
}

export default function MainRanking({ data }: novelRankingDataType) {
  if (!data) {
    return null;
  }

  const {
    author,
    changeRanking,
    genre,
    ranking,
    serializationStatus,
    thumbnail,
    title,
    grade,
    novelId,
  } = data;

  const IS_READABLE_BY_All = 0;
  const IS_NINETEEN_PLUS = 19;

  function getGradeText(grade: number) {
    if (grade === IS_NINETEEN_PLUS) {
      return <p className={style.nineteenCheck}>{grade}</p>;
    } else if (grade === IS_READABLE_BY_All) {
      return <p className={style.allCheck}>All</p>;
    } else {
      return <p className={style.basicCheck}>{grade}</p>;
    }
  }

  return (
    <Link href={`/noveldetail/${novelId}`}>
      <div className={style.mainRankingCard}>
        <div className={style.mainRankingContainer}>
          <div className={style.allNovelImgContainer}>
            <div className={style.allListImg}>
              <Image src={thumbnail} alt={"이미지"} width={100} height={100} loading="lazy"/>
            </div>

            <div className={style.listNewIcon}>
              <Image
                src={"/assets/images/icons/NewIcon.svg"}
                alt={"이미지"}
                width={30}
                height={30}
                loading="lazy"
                placeholder="empty"
              />
            </div>

            <div className={style.ageCheck}>{getGradeText(grade)}</div>
          </div>
          <div className={style.mainRankingNumber}>
            <p>{ranking}</p>
          </div>
          <div className={style.mainRankingInfo}>
            <div className={style.mainRankingTitle}>
              <p>{title}</p>
              <MainRankingTitle title={title} changeRanking={changeRanking} />
              {changeRanking === null && (
                <div className={style.newImg}>NEW</div>
              )}
            </div>
            <div className={style.mainRankinSubInfo}>
              {author} | {serializationStatus} | {genre}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
