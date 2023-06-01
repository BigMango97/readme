import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "@/components/pages/viewer/ViewerTop.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { useRouter } from "next/router";
import Link from "next/link";
import { useCookies } from "react-cookie";
interface Props {
  title: string;
  novelsTitle: string;
  registration: string;
}
export default function ViewerTop({ title, novelsTitle, registration }: Props) {
  const router = useRouter();
  console.log("router = ", router);
  const [cookies] = useCookies(["accessToken"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  useEffect(() => {
    setLoginCheck(cookies.accessToken);
  }, []);

  const movePage = () => {
    if (!loginCheck) {
      localStorage.setItem("link", router.asPath);
      router.push("/login");
    }
  };
  return (
    <div className={style.Container}>
      <div className={style.titleContainer}>
        <Link href="/">
          <div className={style.homeImg}>
            <Image
              src={"/assets/images/icons/home_black.svg"}
              alt={"이미지"}
              width={25}
              height={25}
            />
          </div>
        </Link>
        <p>{novelsTitle}</p>
        {loginCheck ? (
          <Link href="/mypage">
            <div className={style.myImg}>
              <Image
                src={"/assets/images/icons/my.svg"}
                alt={"이미지"}
                width={30}
                height={30}
              />
            </div>
          </Link>
        ) : (
          <div className={style.myImg}>
            <Image
              src={"/assets/images/icons/heart.svg"}
              alt={"이미지"}
              width={30}
              height={30}
              onClick={movePage}
            />
          </div>
        )}
      </div>
      <LineSeparator colorline="grayline" />
      <div className={style.episodeContainer}>
        <div className={style.leftArrowImg} onClick={() => router.back()}>
          <Image
            src={"/assets/images/icons/left-chevron.svg"}
            alt={"이미지"}
            width={25}
            height={25}
          />
        </div>
        <div className={style.episodeInfo}>
          <div className={style.episodeTitle}>{title}</div>
          <div className={style.episodeDay}>{registration}</div>
        </div>
      </div>
      <LineSeparator colorline="grayline" />
    </div>
  );
}
