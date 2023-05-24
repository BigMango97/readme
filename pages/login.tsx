import Config from "@/configs/config.export";
import { useRouter } from "next/router";
import style from "@/components/ui/Login.module.css";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Login() {
  useEffect(() => {
    const jsKey = "cd2447cf90f5929ed98bc599d51f323d";
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
      console.log(window.Kakao.isInitialized());
    }
  }, []);

  const kakaoLogin = () => {
    if (!window.Kakao.isInitialized()) return;
    //console.log(window.Kakao.Auth);
    window.Kakao.Auth.authorize({
      //redirectUri: `https://readme.life/kakao`,
      redirectUri: `http://localhost:3000/kakao`,
    });
  };
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
          <p>로그인 후 이용할 수 있는 서비스 입니다</p>

          <div className={style.naverBtn}>
            <div id="naverIdLogin" />
            <Image
              src="/assets/images/naver_btnG.png"
              alt="naver login Btn"
              width={150}
              height={40}
              onClick={kakaoLogin}
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
