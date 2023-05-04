import React from "react";
import style from "@/components/pages/search/RecommendItems.module.css";
export default function RecommendItems() {
  return (
    <div className={style.recommendItemsContainer}>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <div className={style.line}></div>
      </div>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <div className={style.line}></div>
      </div>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <div className={style.line}></div>
      </div>
    </div>
  );
}
