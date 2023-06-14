import { useRouter } from "next/router";
import Image from "next/image";
import React from "react";
import useKakaoInit from "@/hooks/useKakaoInit";
import Config from "@/configs/config.export";
import Head from "next/head";
import style from "@/components/ui/Login.module.css";

export default function AgeCheck() {
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
    <>
      <Head>
        <title>로그인 | ReadMe</title>
        <meta name="description" content="로그인 페이지 입니다." />
      </Head>
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
            <p>연령 확인 후 이용할 수 있는 서비스 입니다</p>
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
    </>
  );
}
