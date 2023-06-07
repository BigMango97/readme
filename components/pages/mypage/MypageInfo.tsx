import React, { useEffect, useState } from "react";
import style from "@/components/pages/mypage/MypageInfo.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
export default function MypageInfo() {
  const [userNickname, setUserNickName] = useState<string>("");
  const [userPoint, setUserPoint] = useState<number>(0);
  const [userProfileImg, setUserProfileImg] = useState<string>("");
  const router = useRouter();
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
            <Image
              src={userProfileImg}
              alt="profileImg"
              width={120}
              height={120}
              priority
            />
            <p>
              {userNickname}님 <br /> 오늘도 응원해요!
            </p>
          </div>
          <div className={style.mypageContainerPointInfo}>
            <div className={style.mypageContainerPoint}>
              포인트 : {userPoint.toLocaleString("en")}P
            </div>
            <button
              className={style.mypageContainerPointBtn}
              onClick={() => router.push("/pointCharge")}
            >
              충전
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
