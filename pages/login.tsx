import Config from "@/configs/config.export";
import { useRouter } from "next/router";
import style from "@/components/ui/Login.module.css";
import Image from "next/image";
import React, { useEffect } from "react";

export default function login() {
  const router = useRouter();
  const baseUrl = Config().baseUrl;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init("44a4ffe52adbc9affd97e7029493a34d"); //
      console.log(window.Kakao.isInitialized());
    }
  }, []);

  const kakaoLogin = () => {
    console.log(window.Kakao.Auth);
    window.Kakao.Auth.authorize({
      redirectUri: `http://readme.life/kakao`, //수정필요
      scope:
        "name, profile_image, account_email, gender, birthyear, phone_number",
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
          <p>로그인 후 이용해주세요</p>

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
