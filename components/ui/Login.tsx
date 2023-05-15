import React from "react";
import style from "@/components/ui/Login.module.css";
import Image from "next/image";
export default function Login() {
  return (
    <div className={style.container}>
      <div className={style.mainContainer}>
        <div className={style.mainInfo}>
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={150}
            height={80}
            priority
          />
          <p>로그인 후 이용해주세요</p>
          <div className={style.naverBtn}>
            <Image
              src="/assets/images/naver_btnG.png"
              alt="naver login Btn"
              width={150}
              height={40}
            />
          </div>
        </div>
        <div className={style.closeBtn}>
          <Image
            src="/assets/images/icons/close_white.svg"
            alt="close Btn"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
}
