import React, { useEffect } from "react";
import style from "@/components/layouts/MenuSlide.module.css";
import Image from "next/image";
import { useState } from "react";
import SlideWebViewList from "../ui/SlideWebViewList";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";
import useKakaoInit from "@/hooks/useKakaoInit";
type Props = {
  onClose: () => void;
};
export default function MenuSlide(props: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    props.onClose();
  };
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  //const [welcomeText, setWelcomeText] = useState<string>("");
  const [cookies] = useCookies(["uuid"]);
  const router = useRouter();

  const [userPoint, setUserPoint] = useState<number>(0);
  useEffect(() => {
    if (cookies.uuid) {
      setLoginCheck(true);
      const getPoint = async () => {
        const pointRes = await axios.get(`/users-service/v1/user/getPoint`);
        setUserPoint(Number(pointRes.data.data.point));
      };
      getPoint();
    }
  }, [cookies.uuid]);

  useKakaoInit();

  const kakaoLogin = () => {
    sessionStorage.setItem("link", "/");
    if (!window.Kakao.isInitialized()) return;
    window.Kakao.Auth.authorize({
      //redirectUri: `https://readme.life/kakao`,
      redirectUri: `http://localhost:3000/kakao`,
    });
  };

  return (
    <>
      {isOpen && (
        <div className={style.container}>
          <div className={style.blackContainer} onClick={handleClose}></div>
          <div className={style.menuList}>
            <div className={style.menuListHeader} onClick={handleClose}>
              <Image
                src="/assets/images/icons/close.svg"
                alt="logo"
                width={50}
                height={50}
                priority
              />
            </div>
            {loginCheck ? (
              <div className={style.menuListInfo}>
                <div className={style.mainInfoTitle}>
                  <p className={style.mainWelcomeTitle}>Welcome !</p>
                  <p className={style.subInfoTitle}>
                    ReadMe에 오신것을 <br />
                    환영합니다!
                  </p>
                  <div className={style.pointContainer}>
                    <p>잔여 포인트 : {userPoint.toLocaleString("en")}P</p>
                    <div
                      className={style.pointBtn}
                      onClick={() => router.push("/pointCharge")}
                    >
                      +충전
                    </div>
                  </div>
                </div>
                <SlideWebViewList />
              </div>
            ) : (
              <div className={style.menuListInfo}>
                <div className={style.mainTitle}>
                  <p>
                    다양한 서비스를
                    <br /> 이용하고 싶으시다면
                    <br /> 로그인을 해주세요
                  </p>
                  <div className={style.kakaoLoginBtn}>
                    <Image
                      src="/assets/images/kakaoLogin.png"
                      alt="kakaologin"
                      width={250}
                      height={50}
                      onClick={kakaoLogin}
                    />
                  </div>
                </div>
                <SlideWebViewList />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
