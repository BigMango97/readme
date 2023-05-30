import React, { useState } from "react";
import style from "@/components/layouts/DetailFooter.module.css";
import Image from "next/image";
import isLogin from "@/configs/isLogin";
import { useRouter } from "next/router";
import Login from "@/pages/login";
import { useCookies } from "react-cookie";
export default function DetailFooter() {
  const [clickLike, setClickLike] = useState<boolean>(false);
  const router = useRouter();
  const [cookies] = useCookies(["uuid"]);

  const likeBtnHandle = () => {
    setClickLike(!clickLike);
  };
  //api불러와서 찜 목록 어쩌구 해...
  return (
    <div className={style.detailFooter}>
      <div className={style.novelBuyBtn}>
        {isLogin() ? (
          <Image
            src={
              clickLike
                ? "/assets/images/icons/fillHeartBtn.svg"
                : "/assets/images/icons/blankHeartBtn.svg"
            }
            alt="logo"
            width={30}
            height={30}
            priority
            onClick={likeBtnHandle}
          />
        ) : (
          <Login />
        )}
      </div>
      <div className={style.novelReadBtn}>
        <Image
          src="/assets/images/icons/bookwhite.svg"
          alt="logo"
          width={30}
          height={30}
          priority
        />
        <div>무료로 첫편보기</div>
      </div>
    </div>
  );
}
