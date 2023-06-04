import React, { useEffect, useState } from "react";
import style from "@/components/pages/mypage/MypageInfo.module.css";
import Image from "next/image";
export default function MypageInfo() {
  const [userName, setUserName] = useState<string>("");
  const [userPoint, setUserPoint] = useState<number>(0);
  const [userProfileImg, setUserProfileImg] = useState<string>("");
  useEffect(() => {
    const name = localStorage.getItem("nickname") || "";
    setUserName(name);
    const point = localStorage.getItem("point");
    setUserPoint(Number(point));

    const profileImg = localStorage.getItem("profileImg") || "";
    setUserProfileImg(profileImg);
  }, []);
  return (
    <>
      <div className={style.mypageContainer}>
        <div className={style.mypageContainerInfo}>
          <div className={style.mypageTop}>
            <Image
              src={userProfileImg}
              alt="profileImg"
              width={120}
              height={120}
              priority
            />
            <p>
              {userName}님 <br /> 오늘도 응원해요!
            </p>
          </div>
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
