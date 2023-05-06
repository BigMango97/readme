import React from "react";
import style from "@/components/pages/search/RecentSearchItems.module.css";
import Image from "next/image";
import CloseButton from "@/components/ui/CloseButton";

export default function RecentSearchItems() {
  return (
    <div className={style.recentSearchContainer}>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살부터 슈퍼스타1</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살스타2</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살부스타3</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살부터 슈퍼스타4</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0스타5</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살스타</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살스타</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살스타</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살스타</div>
        <CloseButton />
      </div>
      <div className={style.recentSearch}>
        <div className={style.recentSearchText}>0살스타</div>
        <CloseButton />
      </div>
    </div>
  );
}
