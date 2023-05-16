import React from "react";
import style from "@/components/pages/main/MainEvent.module.css";
import Image from "next/image";
export default function MainEvent(props: { thumbnail: string }) {
  return (
    <section className={style.mainEvent}>
        <div className={style.cardContainerInfo}>
          <h2>Event</h2>
          <div className={style.cardContainerEventTitle}>
            가슴이 웅장해지는
            <br /> <strong>따끈따끈한</strong> 무료 소설
          </div>
          <p>흑아인 | 완결 | 웹소설판타지</p>
          <div className={style.cardContainerTitle}>사라진 비서에게</div>
        </div>
        <div className={style.cardContainerImgInfo}>
          <Image
            src={"/assets/images/dummy/bestItem01.png"}
            alt="썸네일 이미지"
            width={180}
            height={160}
          />
        </div>
    </section>
  );
}
