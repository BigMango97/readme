import React from "react";
import style from "@/components/layouts/DetailFooter.module.css";
import Image from "next/image";
export default function DetailFooter() {
  return (
    <div className={style.detailFooter}>
      <div className={style.novelBuyBtn}>
        <Image
          src="/assets/images/icons/bookmark-2.svg"
          alt="logo"
          width={30}
          height={30}
          priority
        />
      </div>
      <div className={style.novelReadBtn}>
        <Image
          src="/assets/images/icons/bookwhite.svg"
          alt="logo"
          width={30}
          height={30}
          priority
        />
        <div>무료로 첫편보기</div>
      </div>
    </div>
  );
}
