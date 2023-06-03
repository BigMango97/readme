import React, { useState, useEffect, useCallback } from "react";
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
  novelId: number;
}
export default function ViewerTop({
  title,
  novelsTitle,
  registration,
  novelId,
}: Props) {
  const router = useRouter();
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, [cookies.uuid]);

  const movePage = useCallback(() => {
    if (!loginCheck) {
      localStorage.setItem("link", router.asPath);
      router.push("/login");
    }
  }, [loginCheck, router]);

  const handleArrowClick = useCallback(() => {
    router.push(`/noveldetail/${novelId}`);
  }, [router, novelId]);
  return (
    <div className={style.Container}>
      <div className={style.titleContainer}>
        <Link href="/">
          <div className={style.homeImg}>
            <Image
              src={"/assets/images/icons/home_black.svg"}
              alt={"homeicon"}
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
                alt={"myicon"}
                width={30}
                height={30}
              />
            </div>
          </Link>
        ) : (
          <div className={style.loginImg}>
            <Image
              src={"/assets/images/icons/login.svg"}
              alt={"loginicon"}
              width={50}
              height={50}
              onClick={movePage}
            />
          </div>
        )}
      </div>
      <LineSeparator colorline="grayline" />
      <div className={style.episodeContainer}>
        <div className={style.leftArrowImg} onClick={handleArrowClick}>
          <Image
            src={"/assets/images/icons/left-chevron.svg"}
            alt={"leftarrowicon"}
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
