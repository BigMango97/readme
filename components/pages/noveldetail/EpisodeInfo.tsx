import React from "react";
import { episodeCardDataType } from "@/types/model/mainDataType";
import EpisodeCard from "./EpisodeCard";
import { useRouter } from "next/router";
import style from "@/components/pages/noveldetail/EpisodeInfo.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { SortType } from "./NovelDetailMenu";
export default function EpisodeInfo(props: {
  episodes: episodeCardDataType[];
  sort: SortType;
  onSortChange: (newSort: SortType) => void;
}) {
  const router = useRouter();
  const directVeiwPage = (index: number) => {
    router.push(`/viewer/${index}`);
  };
  return (
    <div className={style.container}>
      <div className={style.sortNovel}>
        <LineSeparator colorline="greenline" />
        <div
          className={props.sort === "최신순" ? style.activeSort : style.hidden}
          onClick={() => props.onSortChange("최신순")}
        >
          최신순
        </div>
        <div
          className={props.sort === "1화부터" ? style.activeSort : style.hidden}
          onClick={() => props.onSortChange("1화부터")}
        >
          1화부터
        </div>
      </div>
      {props.episodes &&
        props.episodes.map((item, index) => (
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
