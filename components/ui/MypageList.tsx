import React from "react";
import Image from "next/image";
import style from "@/components/ui/MypageList.module.css";
export default function MypageList() {
  return (
    <div className={style.mypageListContainer}>
      <div className={style.mypageListTitleInfo}>
        <Image
          src={"/assets/images/dummy/bestItem01.png"}
          alt="썸네일 이미지"
          width={50}
          height={50}
        />
        <p>좋아요 한 작품</p>
      </div>
      <Image
        src={"/assets/images/icons/Arrow-Left-Circle.svg"}
        alt="썸네일 이미지"
        width={35}
        height={35}
      />
    </div>
  );
}
