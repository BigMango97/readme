import React from "react";
import style from "@/components/pages/main/MainEvent.module.css";
import Image from "next/image";
interface MainBestItemProps {
  data: dataType;
  eventImage:string
}
interface dataType {
  author: string;
  episodeCount: number;
  genre: string;
  grade: number;
  scheduleId: number;
  starRating: number;
  title: string;
  views: number;
  serializationStatus: string;
}

export default function MainEvent({data,eventImage}: MainBestItemProps) {
  return (
    <>
          <section className={style.mainEvent}>
            <div className={style.cardContainerInfo}>
              <h2>Event</h2>
              <div className={style.cardContainerEventTitle}>
                가슴이 웅장해지는
                <br /> <strong>따끈따끈한</strong> 무료 소설
              </div>
              <p>
                {data?.author} | {data?.serializationStatus}|{" "}
                {data?.genre}
              </p>
              <div className={style.cardContainerTitle}>{data?.title}</div>
            </div>
            <div className={style.cardContainerImgInfo}>
              <Image
                src={eventImage}
                alt="썸네일 이미지"
                width={180}
                height={220}
              />
            </div>
          </section>
      
    </>
  );
}
