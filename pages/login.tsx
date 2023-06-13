import { useRouter } from "next/router";
import style from "@/components/ui/Login.module.css";
import Image from "next/image";
import React, { useEffect } from "react";
import useKakaoInit from "@/hooks/useKakaoInit";
import Config from "@/configs/config.export";

export default function Login() {
  const router = useRouter();
  const loginRedirectUri = Config().loginRedirectUri;

  useKakaoInit();

  const kakaoLogin = () => {
    if (!window.Kakao.isInitialized()) return;
    window.Kakao.Auth.authorize({
      redirectUri: loginRedirectUri,
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
          <div className={style.loginBtn}>
            <Image
              src="/assets/images/kakaoLogin.png"
              alt="kakao login Btn"
              width={245}
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
            onClick={() => router.back()}
          />
        </div>
      </div>
    </div>
  );
}
