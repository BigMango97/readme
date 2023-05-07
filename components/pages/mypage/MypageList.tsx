import React from "react";
import style from "@/components/pages/mypage/MypageList.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
export default function MypageList() {
  return (
    <>
      <div className={style.mypageListContainer}>
        <div className={style.mypageList}>
          <p>좋아요 한 작품</p>
        </div>
        <LineSeparator colorline="grayline" />
      </div>
    </>
  );
}
