import React from "react";
import style from "@/components/pages/noveldetail/EpisodeInfo.module.css";
import Image from "next/image";
export default function EpisodeInfo() {
  return (
    <div className={style.container}>

      <div className={style.episodeCard}>
        <div className={style.episodeCardImageInfo}>
          <Image
            src={"/assets/images/dummy/bestItem01.png"}
            alt="썸네일 이미지"
            width={100}
            height={100}
          />
        </div>
        <div className={style.episodeCardInfo}>
          <div>{"흑아인"}</div>
          <div>{"2025-03-12"}</div>
          <div>{9.6}</div>
          <div>{"무료"}</div>
        </div>
      </div>

      <div className={style.episodeCard}>
        <div className={style.episodeCardImageInfo}>
          <Image
            src={"/assets/images/dummy/bestItem01.png"}
            alt="썸네일 이미지"
            width={100}
            height={100}
          />
        </div>
        <div className={style.episodeCardInfo}>
          <div>{"흑아인"}</div>
          <div>{"2025-03-12"}</div>
          <div>{9.6}</div>
          <div>{"무료"}</div>
        </div>
      </div>

      <div className={style.episodeCard}>
        <div className={style.episodeCardImageInfo}>
          <Image
            src={"/assets/images/dummy/bestItem01.png"}
            alt="썸네일 이미지"
            width={100}
            height={100}
          />
        </div>
        <div className={style.episodeCardInfo}>
          <div>{"흑아인"}</div>
          <div>{"2025-03-12"}</div>
          <div>{9.6}</div>
          <div>{"무료"}</div>
        </div>
      </div>

  
    </div>
  );
}
