import React from "react";
import style from "@/components/pages/mypage/MypageInfo.module.css";
export default function MypageInfo() {
  return (
    <>
      <div className={style.mypageContainer}>
        <div className={style.mypageContainerInfo}>
          <p>
            맹고미님 <br /> 오늘도 응원해요!
          </p>
          <div className={style.mypageContainerPointInfo}>
            <div className={style.mypageContainerPoint}>포인트 : 1000P</div>
            <button className={style.mypageContainerPointBtn}>충전</button>
          </div>
        </div>
      </div>
    </>
  );
}
