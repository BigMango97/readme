import React from "react";
import style from "@/components/pages/search/RecommendItems.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
export default function RecommendItems() {
  return (
    <div className={style.recommendItemsContainer}>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <LineSeparator colorline="grayline" />
      </div>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <LineSeparator colorline="grayline" />
      </div>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <LineSeparator colorline="grayline" />
      </div>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <LineSeparator colorline="grayline" />
      </div>
      <div className={style.recommendItem}>
        <p>로맨스 판타지 </p>
        <LineSeparator colorline="grayline" />
      </div>
    </div>
  );
}
