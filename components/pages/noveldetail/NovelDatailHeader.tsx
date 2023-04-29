import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailHeader.module.css";
export default function NovelDatailHeader() {
  return (
    <>
    <div className={style.container}>
      <header className={style.header}>
        <div className={style.leftmenu}>
          <Image
            src="/assets/images/icons/backButton.svg"
            alt="left-arrow"
            width={20}
            height={20}
            priority
          />
        </div>
         <div className={style.noveldetailtitle}>
          <p>Web Novel Detail</p>
         </div>
      </header>
      </div>
    </>
  );
}
