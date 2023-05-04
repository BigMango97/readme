import React from "react";
import style from "@/components/pages/search/Search.module.css";
import Image from "next/image";

export default function RecentSearchTop() {
  return (
    <div className={style.recentSearchTopWrap}>
      <div className={style.recentSearchTopTitle}>
        <p>최근 검색어</p>
      </div>
      <div className={style.recentSearchTopDelete}>
        <p>
          전체삭제
          <Image
            src="/assets/images/icons/delete.svg"
            alt="trashIcon"
            width={17}
            height={17}
          />
        </p>
      </div>
    </div>
  );
}
