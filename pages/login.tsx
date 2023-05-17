import React, { useEffect } from "react";
import style from "@/components/ui/Login.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import axios from "axios";
declare global {
  interface Window {
    naver: any;
  }
}
export default function Login() {
  const router = useRouter();

  const NAVER_CLIENT_ID = "mtrCdQIuhi9lx9cDpPsJ";
  const NAVER_CALLBACK_URL = "http://localhost:3000";
  useEffect(() => {
    const { naver } = window;
    initializeNaverLogin(naver);
    //userAccessToken();
  }, []);

  const initializeNaverLogin = (naver: any) => {
    const naverLogin = new naver.LoginWithNaverId({
      clientId: NAVER_CLIENT_ID,
      callbackUrl: NAVER_CALLBACK_URL,
      // 팝업창으로 로그인을 진행할 것인지?
      isPopup: false,
      // 버튼 타입 ( 색상, 타입, 크기 변경 가능 )
      loginButton: { color: "green", type: 3, height: 58 },
      callbackHandle: true,
    });
    naverLogin.init();
  };

  const naverLogin = () => {
    axios
      .get(`http://10.10.10.197:8080/auth/login?code=V0YnWlXU0XMkSBbYk0`)
      .then((res) => {
        console.log("resres = ", res);
      });
  };

  //const code = router.query.code;
  //console.log("code = ", router.query);

  // useEffect(() => {
  //   if (!window.Kakao.isInitialized()) {
  //     window.Kakao.init("0348a267c9ce5b29131c78ad1384a83e");
  //     console.log(window.Kakao.isInitialized());
  //   }
  // }, []);

  // function kakaoLogin() {
  //   console.log(window.Kakao.Auth);
  //   window.Kakao.Auth.authorize({
  //     redirectUri: `http://localhost:3000/naverLogin`,
  //   });
  //   //loginHandler
  // }

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
            {/* <Image
              src="/assets/images/naver_btnG.png"
              alt="naver login Btn"
              width={150}
              height={40}
              onClick={naverLogin}
            /> */}
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
