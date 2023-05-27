import React from "react";
import style from "@/components/pages/viewer/ViewerBottom.module.css";
import Image from "next/image";
export default function ViewerBottom() {
  return (
    <>
      <div className={style.container}>
        <div className={style.menuIcon}>
          <Image
            src={"/assets/images/icons/menu.svg"}
            alt={"이미지"}
            width={15}
            height={15}
          />
        </div>
        <div className={style.starRatingIcon}>
          <Image
            src={"/assets/images/icons/star.svg"}
            alt={"이미지"}
            width={20}
            height={20}
          />
        </div>
        <div className={style.commentsIcon}>
          <Image
            src={"/assets/images/icons/comment.svg"}
            alt={"이미지"}
            width={25}
            height={25}
          />
        </div>
        <div className={style.leftArrowIcon}>
          <Image
            src={"/assets/images/icons/chevron-left.svg"}
            alt={"이미지"}
            width={25}
            height={25}
          />
        </div>
        <div className={style.rightArrowIcon}>
          <Image
            src={"/assets/images/icons/chevron-right.svg"}
            alt={"이미지"}
            width={25}
            height={25}
          />
        </div>
      </div>
    </>
  );
}
