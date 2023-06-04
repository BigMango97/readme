import React from "react";
import style from "@/components/pages/main/MainRanking.module.css";
import Image from "next/image";
interface Props {
  data: {
    author: string;
    changeRanking: number;
    genre: string;
    grade: number;
    novelId: number;
    ranking: number;
    serializationStatus: string;
    thumbnail: string;
    title: string;
  };
}

export default function MainRanking({ data }: Props) {
  const {
    author,
    changeRanking,
    genre,
    ranking,
    serializationStatus,
    thumbnail,
    title,
    grade
  } = data;

  if (!data) {
    return null;
  }

  const IS_READABLE_BY_All = 0;
const IS_NINETEEN_PLUS = 19;

function getGradeText(grade: number) {
  if (grade === IS_NINETEEN_PLUS) {
    return <p className={style.nineteenCheck}>{grade}</p>;
  }
  if (grade === IS_READABLE_BY_All) {
    return <p className={style.allCheck}>All</p>;
  }
  return <p className={style.basicCheck}>{grade}</p>;
}



  return (
    <>
  
        <div className={style.mainRankingCard}>
          <div className={style.mainRankingContainer}>
          <div className={style.allNovelImgContainer}>
        <div className={style.allListImg}>
          <Image
            src={thumbnail}
            alt={"이미지"}
            width={100}
            height={100}
          />
        </div>
        
          <div className={style.listNewIcon}>
            <Image
              src={"/assets/images/icons/NewIcon.svg"}
              alt={"이미지"}
              width={30}
              height={30}
            />
          </div>
        
        <div className={style.ageCheck}>
          {getGradeText(grade)}
        </div>
      </div>
            <div className={style.mainRankingNumber}>
              <p>{ranking}</p>
            </div>
            <div className={style.mainRankingInfo}>
              <div className={style.mainRankingTitle}>
                <p>{title}</p>
                {data.changeRanking > 0 && (
                  <div className={style.upImg}>
                    <Image
                      src={"/assets/images/icons/up.svg"}
                      alt={"Up"}
                      width={10}
                      height={10}
                    />
                    <span>{changeRanking}</span>
                  </div>
                )}
                {data.changeRanking < 0 && (
                  <div className={style.downImg}>
                    <Image
                      src={"/assets/images/icons/down.svg"}
                      alt={"Down"}
                      width={10}
                      height={10}
                    />
                    <span>{Math.abs(changeRanking)}</span>
                  </div>
                )}
                {data.changeRanking === 0 && (
                  <div className={style.notchangeImg}>
                    <Image
                      src={"/assets/images/icons/notchange.svg"}
                      alt={"No change"}
                      width={10}
                      height={10}
                    />
                  </div>
                )}
                {data.changeRanking === null && (
                  <div className={style.newImg}>NEW</div>
                )}
              </div>
              <div className={style.mainRankinSubInfo}>
                {author} | {serializationStatus} | {genre}
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
