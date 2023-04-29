import React from "react";
import style from "@/components/pages/main/MainEvent.module.css";
import NovelCard from "@/components/ui/NovelCard";
export default function MainEvent(props: { thumbnail: string }) {
  return (
    <section className={style.mainEvent}>
      <div className={style.cardContainer}>
        <div className={style.cardContainerInfo}>
          <h2>Event</h2>
          <div className={style.cardContainerEventTitle}>
            가슴이 웅장해지는
            <br /> 따끈따끈한
            <br /> 무료 소설
          </div>
          <div className={style.cardContainerTitle}>사라진 비서에게</div>
          <p>흑아인 | 완결 | 웹소설판타지</p>
        </div>
        <div className={style.boxshadow}>
          <NovelCard
            width={200}
            height={200}
            backgroundwidth={150}
            backgroundheight={210}
            backgroundColor={"rgb(110,72,235)"}
            thumbnail={props.thumbnail}
          />
        </div>
      </div>
    </section>
  );
}
