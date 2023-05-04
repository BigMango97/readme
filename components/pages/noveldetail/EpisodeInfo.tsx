import React from "react";
import style from "@/components/pages/noveldetail/EpisodeInfo.module.css";
import Image from "next/image";
import LineSeparator from "@/components/ui/LineSeparator";
import NewUi from "@/components/ui/NewUi";
import CheckCircleUi from "@/components/ui/CheckCircleUi";
export default function EpisodeInfo() {
  return (
    <div className={style.container}>
      <div className={style.sortNovel}>
        <LineSeparator
          backgroundcolor={"#7fffa3"}
          width="65%"
          height="2px"
          margin="1rem 0rem"
        />
        <div className={style.sortIcon}>
          <Image
            src={"/assets/images/icons/upload.svg"}
            alt="썸네일 이미지"
            width={20}
            height={20}
          />
          <div>첫화부터</div>
        </div>
      </div>
      <div className={style.episodeCard}>
        <div className={style.episodeFreeNew}>
          <Image
            src={"/assets/images/icons/freeicon.svg"}
            alt="썸네일 이미지"
            width={50}
            height={25}
          />
          <NewUi />
        </div>

        <div className={style.episodeCardInfo}>
          <div className={style.episodeCardDescription}>
            <div className={style.episodeTitle}>신과 함께 레벨업 635화</div>
            <div className={style.episodeDay}>2023.05.23</div>
          </div>
        </div>
      </div>
      <LineSeparator
        backgroundcolor="var(--readme-gray-dark)"
        width="100%"
        height="1px"
        margin="0.2rem 0"
      />
      <div className={style.episodeCard}>
        <div className={style.episodeFreeNew}>
          <Image
            src={"/assets/images/icons/freeicon.svg"}
            alt="썸네일 이미지"
            width={50}
            height={25}
          />
          <NewUi />
        </div>
        <div className={style.episodeCardInfo}>
          <div className={style.episodeCardDescription}>
            <div className={style.episodeTitle}>신과 함께 레벨업 635화</div>
            <div className={style.episodeDay}>2023.05.23</div>
          </div>
          <CheckCircleUi />
        </div>
      </div>
      <LineSeparator
        backgroundcolor="var(--readme-gray-dark)"
        width="100%"
        height="1px"
        margin="0.2rem 0"
      />
      <div className={style.episodeCard}>
        <div className={style.episodeCardInfo}>
          <div className={style.episodeCardDescription}>
            <div className={style.episodeTitle}>신과 함께 레벨업 635화</div>
            <div className={style.episodeDay}>2023.05.23</div>
          </div>
          <CheckCircleUi />
        </div>
      </div>
      <LineSeparator
        backgroundcolor="var(--readme-gray-dark)"
        width="100%"
        height="1px"
        margin="0.2rem 0"
      />
    </div>
  );
}
