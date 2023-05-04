import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailHeader.module.css";
export default function NovelDatailHeader() {
  return (
    <>
      <header className={style.detailHeadercontainer}>
        <div className={style.header}>
          <div className={style.leftmenu}>
            <Image
              src="/assets/images/icons/leftarrowpurple.svg"
              alt="left-arrow"
              width={15}
              height={15}
              priority
            />
          </div>
          <div className={style.novelDetailTitle}>
            <div className={style.noevelMainTitle}>신과 함께 레벨업</div>
            <p>흑아인 | 완결 | 웹소설판타지</p>
          </div>
        </div>
      </header>
    </>
  );
}
