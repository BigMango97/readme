import React from "react";
import NovelCard from "@/components/ui/NovelCard";
import style from "@/components/pages/noveldetail/EpisodeInfo.module.css";
export default function EpisodeInfo() {
  return (
    <div className={style.container}>
      <div className={style.episodeCard}>
        <NovelCard width={100} height={100} />
        <div className={style.episodeCardInfo}>
          <div>{"흑아인"}</div>
          <div>{"2025-03-12"}</div>
          <div>{9.6}</div>
          <div>{"무료"}</div>
        </div>
      </div>
      <div className={style.episodeCard}>
        <NovelCard width={100} height={100} />
        <div className={style.episodeCardInfo}>
          <div>{"흑아인"}</div>
          <div>{"2025-03-12"}</div>
          <div>{9.6}</div>
          <div>{"무료"}</div>
        </div>
      </div>
      <div className={style.episodeCard}>
        <NovelCard width={100} height={100} />
        <div className={style.episodeCardInfo}>
          <div>{"흑아인"}</div>
          <div>{"2025-03-12"}</div>
          <div>{9.6}</div>
          <div>{"무료"}</div>
        </div>
      </div>
      <div className={style.episodeCard}>
        <NovelCard width={100} height={100} />
        <div className={style.episodeCardInfo}>
          <div>{"흑아인"}</div>
          <div>{"2025-03-12"}</div>
          <div>{9.6}</div>
          <div>{"무료"}</div>
        </div>
      </div>
      <div className={style.episodeCard}>
        <NovelCard width={100} height={100} />
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
