import React from "react";
import style from "@/components/pages/novel/AllNovelMenu.module.css";
export default function AllNovelMenu() {
  return (
    <>
      <div className={style.novelMenuContainer}>
        <div className={style.novelMainMenu}>
          <div className={style.novelMenuTitle}>웹소설</div>
          <ul className={style.novelMenuList}>
            <li className={style.novelMenuBox}>전체</li>
            <li className={style.novelMenuBoxActive}>요일</li>
            <li className={style.novelMenuBox}>장르</li>
            <li className={style.novelMenuBox}>신작</li>
            <li className={style.novelMenuBox}>완결</li>
          </ul>
          <div />
        </div>
      </div>
      <div className={style.novelSubMenu}>
        <ul className={style.novelSubMenuList}>
          <li className={style.novelSubMenuBoxActive}>월</li>
          <li className={style.novelSubMenuBox}>화</li>
          <li className={style.novelSubMenuBox}>수</li>
          <li className={style.novelSubMenuBox}>목</li>
          <li className={style.novelSubMenuBox}>금</li>
          <li className={style.novelSubMenuBox}>토</li>
          <li className={style.novelSubMenuBox}>일</li>
        </ul>
      </div>
    </>
  );
}
