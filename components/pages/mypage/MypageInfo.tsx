import React, { useEffect, useState } from "react";
import style from "@/components/pages/mypage/MypageInfo.module.css";
import Image from "next/image";
export default function MypageInfo() {
  const [userNickname, setUserNickName] = useState<string>("");
  const [userPoint, setUserPoint] = useState<number>(0);
  const [userProfileImg, setUserProfileImg] = useState<string>("");
  useEffect(() => {
    const nickname = sessionStorage.getItem("nickname") || "";
    setUserNickName(nickname);
    const point = sessionStorage.getItem("point") || 0;
    setUserPoint(Number(point));

    const profileImg = sessionStorage.getItem("profileImg") || "";
    setUserProfileImg(profileImg);
  }, []);
  return (
    <>
      <div className={style.mypageContainer}>
        <div className={style.mypageContainerInfo}>
          <div className={style.mypageTop}>
            {userProfileImg && (
              <Image
                src={userProfileImg}
                alt="profileImg"
                width={120}
                height={120}
                priority
              />
            )}
            <p>
              {userNickname}님 <br /> 오늘도 응원해요!
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
