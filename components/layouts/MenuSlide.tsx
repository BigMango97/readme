import React from "react";
import style from "@/components/layouts/MenuSlide.module.css";
import Image from "next/image";
import { useState } from "react";
import SlideWebViewList from "../ui/SlideWebViewList";
type Props = {
  onClose: () => void;
};
export default function MenuSlide(props: Props) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    props.onClose();
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
            {/**로그인 했을떄  */}
            <div className={style.menuListInfo}>
              <div className={style.mainInfoTitle}>
                <p className={style.mainWelcomeTitle}>Welcome !</p>
                <p className={style.subInfoTitle}>
                  ReadMe에 오신것을 <br />
                  환영합니다!
                </p>
                <div className={style.pointContainer}>
                  <p>잔여 포인트 : 10,000p</p>
                  <div className={style.pointBtn}>+충전</div>
                </div>
              </div>
              <SlideWebViewList />
            </div> 
            {/**로그인 안했을떄 */}
            {/* <div className={style.menuListInfo}>
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
                  ></Image>
                </div>
              </div>
              <SlideWebViewList/>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
