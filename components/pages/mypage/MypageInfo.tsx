import React, { useEffect, useState } from "react";
import style from "@/components/pages/mypage/MypageInfo.module.css";
export default function MypageInfo() {
  const [userName, setUserName] = useState<string>();
  const [userPoint, setUserPoint] = useState<number>();
  useEffect(() => {
    const name = localStorage.getItem("name") || undefined;
    setUserName(name);
    //user의 보유 포인트를 받는 api 추가하기
    //setUserPoint
  }, []);
  return (
    <>
      <div className={style.mypageContainer}>
        <div className={style.mypageContainerInfo}>
          <p>
            {userName}님 <br /> 오늘도 응원해요!
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
