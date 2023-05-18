import React from "react";
import style from "@/components/pages/noveldetail/EpisodeCard.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import NewUi from "@/components/ui/NewUi";
export default function EpisodeCard(props: {
  name: string;
  free: boolean;
  registrationDate: string;
  starRating: number;
  isNew: boolean;
}) {
  return (
    <>
      <div className={style.episodeCard}>
        <div className={style.episodeCardInfo}>
          <div className={style.episodeCardDescription}>
            <div className={style.episodeCardTitleNew}>
              <div className={style.episodeTitle}>{props.name}</div>
              {props.isNew && <NewUi />}
            </div>
            <div className={style.episodeDayFree}>
              <div className={style.episodeDay}>{props.registrationDate}</div>
              {props.free && <div>무료</div>}
            </div>
          </div>
        </div>
      </div>
      <LineSeparator colorline="grayline" />
    </>
  );
}
