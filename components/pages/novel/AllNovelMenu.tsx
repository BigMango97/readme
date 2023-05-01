import React from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";
export default function AllNovelMenu() {
  return (
    <>
      <div className={style.novelMenuContainer}>
        <div className={style.novelMenuBoxActive}>요일</div>
        <div className={style.novelMenuBox}>판타지</div>
        <div className={style.novelMenuBox}>무협</div>
        <div className={style.novelMenuBox}>로맨스</div>
        <div className={style.novelMenuBox}>신작</div>
        <div className={style.novelMenuBox}>완결</div>
      </div>
      <div className={style.novelDay}>
        <div className={style.novelDayBoxActive}>월</div>
        <div className={style.novelDayBox}>화</div>
        <div className={style.novelDayBox}>수</div>
        <div className={style.novelDayBox}>목</div>
        <div className={style.novelDayBox}>금</div>
        <div className={style.novelDayBox}>토</div>
        <div className={style.novelDayBox}>일</div>
      </div>
    </>
  );
}
