import React, { useState, useEffect } from "react";
import Image from "next/image";
import style from "@/components/pages/viewer/ViewerTop.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { useRouter } from "next/router";
import Link from "next/link";
interface Props {
  title: string;
  novelsTitle: string;
  registration: string;
}
export default function ViewerTop({ title, novelsTitle, registration }: Props) {
  const router = useRouter();

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
