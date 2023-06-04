import React, { useEffect, useState } from "react";
import style from "@/components/pages/mypage/MypageInfo.module.css";
export default function MypageInfo() {
  const [userName, setUserName] = useState<string>();
  const [userPoint, setUserPoint] = useState<number>();
  useEffect(() => {
    const name = localStorage.getItem("nickname") || undefined;
    setUserName(name);
    const point = localStorage.getItem("point") || undefined;
    setUserPoint(Number(point));
  }, []);
  return (
    <>
      <div className={style.mypageContainer}>
        <div className={style.mypageContainerInfo}>
          <p>
            {userName}님 <br /> 오늘도 응원해요!
          </p>
          <div className={style.mypageContainerPointInfo}>
            <div className={style.mypageContainerPoint}>
              포인트 : {userPoint?.toLocaleString("en")}P
            </div>
            <button className={style.mypageContainerPointBtn}>충전</button>
          </div>
        </div>
      </div>
    </>
  );
}
