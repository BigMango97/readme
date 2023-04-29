import NovelCard from "@/components/ui/NovelCard";
import React from "react";
import style from "@/components/pages/main/MainLanking.module.css";
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
        <NovelCard
          width={120}
          height={120}
          backgroundColor="rgb(229,229,229)"
          thumbnail={"/assets/images/dummy/bestItem01.png"}
        />
      </div>
    </div>
  );
}
