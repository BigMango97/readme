import React from "react";
import style from "@/components/pages/main/MainLanking.module.css";
import Image from "next/image";
export default function MainLanking() {
  return (
    <div className={style.mainLankingCard}>
      <div className={style.mainLankingContainer}>
        <div className={style.mainLankingInfo}>
          <div className={style.mainLanking}>
            <p>1</p>
          </div>
          <div className={style.mainLankingNovelInfo}>
            <p>타이틀이다아아ㅏ</p>
            <p>흑아인 | 완결 | 웹소설판타지</p>
          </div>
        </div>
        <div className={style.mainLankingImgInfo}>
          <Image
            src={"/assets/images/dummy/bestItem01.png"}
            alt="썸네일 이미지"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
}
