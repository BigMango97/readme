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
  } = data;
  return (
    <>
      {data && (
        <div className={style.mainRankingCard}>
          <div className={style.mainRankingContainer}>
            <div className={style.mainRankingImg}>
              <Image
                src={thumbnail}
                alt={"Thumbnail Image"}
                width={70}
                height={70}
              />
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
              </div>
              <div className={style.mainRankinSubInfo}>
                {author} | {serializationStatus} | {genre}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
