import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailinfo.module.css";
import CountViewUi from "@/components/ui/CountViewUi";

export default function NovelDetailInfo() {
  return (
    <div className={style.novelMainInfo}>
      <div className={style.novelMainImageInfo}>
        <Image
          src={"/assets/images/dummy/bestNovel.png"}
          alt="썸네일 이미지"
          width={1000}
          height={1000}
        />
      </div>
      <div className={style.detailnovellikes}>
        <CountViewUi
          icon="/assets/images/icons/eye.svg"
          count={1632178341}
          color="black"
          flexDirection="column"
        />
        <CountViewUi
          icon="/assets/images/icons/star.svg"
          count={9.7}
          color="black"
          flexDirection="column"
        />
        <CountViewUi
          icon="/assets/images/icons/list.svg"
          count={156}
          color="black"
          flexDirection="column"
        />
      </div>
    </div>
  );
}
