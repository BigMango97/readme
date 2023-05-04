import React from "react";
import style from "@/components/pages/search/RecentSearchItems.module.css";
import Image from "next/image";

export default function RecentSearchItems() {
  return (
    <div className={style.recentSearchContainer}>
      <div className={style.recentSearch}>
        <p>0살부터 슈퍼스타1</p>
        <Image
          src="/assets/images/icons/close.svg"
          alt="searchClose"
          width={15}
          height={15}
        />
      </div>
      <div className={style.recentSearch}>
        <p>0살스타2</p>
        <Image
          src="/assets/images/icons/close.svg"
          alt="searchClose"
          width={15}
          height={15}
        />
      </div>
      <div className={style.recentSearch}>
        <p>0살부스타3</p>
        <Image
          src="/assets/images/icons/close.svg"
          alt="searchClose"
          width={15}
          height={15}
        />
      </div>
      <div className={style.recentSearch}>
        <p>0살부터 슈퍼스타4</p>
        <Image
          src="/assets/images/icons/close.svg"
          alt="searchClose"
          width={15}
          height={15}
        />
      </div>
      <div className={style.recentSearch}>
        <p>0스타5</p>
        <Image
          src="/assets/images/icons/close.svg"
          alt="searchClose"
          width={15}
          height={15}
        />
      </div>
      <div className={style.recentSearch}>
        <p>0살스타</p>
        <Image
          src="/assets/images/icons/close.svg"
          alt="searchClose"
          width={15}
          height={15}
        />
      </div>
    </div>
  );
}
