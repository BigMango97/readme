import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailinfo.module.css";
import CountViewUi from "@/components/ui/CountViewUi";
import NovelCard from "@/components/ui/NovelCard";
export default function NovelDetailInfo() {
  return (
    <div className={style.novelMainInfo}>
      <NovelCard width={250} height={250}/>
      <div className={style.detailinfo}>
        <p>신과 함께 레벨업</p>
        <p>흑아인 | 완결 | 웹소설판타지</p>
      </div>
      <div className={style.detailnovellikes}>
        <CountViewUi
          icon="/assets/images/icons/eye.svg"
          count={1332}
          color="black"
        />
        <CountViewUi
          icon="/assets/images/icons/star.svg"
          count={9.5}
          color="black"
        />
        <CountViewUi
          icon="/assets/images/icons/list.svg"
          count={355}
          color="black"
        />
      </div>
    </div>
  );
}
