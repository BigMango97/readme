import React, { Dispatch, SetStateAction, useEffect } from "react";
import style from "@/components/layouts/MenuSlide.module.css";
import Image from "next/image";
import { useState } from "react";
import SlideWebViewList from "../ui/SlideWebViewList";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";


export default function MenuSlide(props: {isOpen: boolean, setIsOpen: Dispatch<SetStateAction<boolean>>}) {
  const { isOpen, setIsOpen } = props;
  


// type Props = {
//   onClose: () => void;
// };


  // const handleClose = () => {
  //   setIsOpen(false);
  //   props.onClose();
  // };

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

  useEffect(() => {
    const jsKey = "cd2447cf90f5929ed98bc599d51f323d";
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(jsKey);
      console.log(window.Kakao.isInitialized());
    }
  }, []);

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
      <div className={isOpen ? style.blackContainer : `${style.blackContainer} ${style.blackContainerClose}`} ></div>
      <div className={isOpen ? style.container : `${style.container} ${style.containerClose}`}>
        <div className={style.menuList}>
          <div className={style.menuListHeader} onClick={()=>setIsOpen(false)}>
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
                    src="/assets/images/kakao_login_large_wide.png"
                    alt="kakaologin"
                    width={400}
                    height={80}
                    onClick={kakaoLogin}
                  />
                </div>
              </div>
              <SlideWebViewList />
            </div>
          )}
        </div>
      </div> 
    </>
  );
}
