import React, { useState } from "react";
import style from "@/components/pages/noveldetail/EpisodeInfo.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { episodeCardDataType } from "@/types/model/mainDataType";
import EpisodeCard from "./EpisodeCard";
import { useRouter } from "next/router";
import Config from "@/configs/config.export";
import { useEffect } from "react";
import axios from "axios";
export default function EpisodeInfo(props: {
  episodes: episodeCardDataType[];
}) {
  const [episodesData, setEpisodesData] = useState(props.episodes);
  const router = useRouter();

  const directVeiwPage = (index: number) => {
    router.push(`/viewer/${index}`);
  };
  return (
    <div className={style.container}>
      <div className={style.sortNovel}>
        <LineSeparator colorline="greenline" />
        <div className={style.sortTitle}>
          <div>최신순</div>
          <div>1화부터</div>
        </div>
      </div>
      {episodesData &&
        episodesData.map((item,index) => (
          <div key={index} onClick={() => directVeiwPage(item.id)}>
            <EpisodeCard
              name={item.name}
              free={item.free}
              registrationDate={item.registrationDate}
              starRating={item.starRating}
              isNew={item.isNew}
            />
          </div>
        ))}
    </div>
  );
}
