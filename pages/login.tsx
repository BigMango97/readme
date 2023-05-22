import Config from "@/configs/config.export";
import { useRouter } from "next/router";
import style from "@/components/ui/Login.module.css";
import Image from "next/image";
import React, { useEffect } from "react";

export default function Login() {
  //const router = useRouter();
  //const baseUrl = Config().baseUrl;

  // const initKakao = () => {
  //   const jsKey = "3c5fd0d61672a00438664be501823461";
  //   if (typeof window !== undefined) {
  //     const Kakao = window.Kakao;
  //     if (Kakao && !Kakao.isInitialized()) {
  //       Kakao.init(jsKey);
  //       console.log(Kakao.isInitialized());
  //     }
  //   }
  // };

  useEffect(() => {
    //initKakao();
    const jsKey = "3c5fd0d61672a00438664be501823461";
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
      console.log(window.Kakao.isInitialized());
    }
    // if (typeof window !== undefined) {
    //   const Kakao = window.Kakao;
    //   if (Kakao && !Kakao.isInitialized()) {
    //     Kakao.init(jsKey);
    //     console.log(Kakao.isInitialized());
    //   }
    // }
  }, []);

  const kakaoLogin = () => {
    if (!window.Kakao.isInitialized()) return;
    //console.log(window.Kakao.Auth);
    window.Kakao.Auth.authorize({
      redirectUri: `http://readme.life/kakao`,
      // scope:
      //   "name, profile_image, account_email, gender, birthyear, phone_number",
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
