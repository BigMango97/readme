import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailinfo.module.css";
import CountViewUi from "@/components/ui/CountViewUi";

interface Props {
  title: string;
  description: string;
  serializationStatus: string;
  genre: string;
  thumbnail: string;
  views: number;
  starRating: number;
}

export default function NovelDetailInfo({
  title,
  description,
  serializationStatus,
  genre,
  thumbnail,
  views,
  starRating,
}: Props) {
  return (
    <div className={style.novelMainInfo}>
      <div className={style.novelMainImageInfo}>
        <Image src={thumbnail} alt="썸네일 이미지" width={200} height={200} />
      </div>
      <div className={style.detailinfo}>
        <p>{title}</p>
        <p>
          {description} | {serializationStatus} | {genre}
        </p>
      </div>
      <div className={style.detailnovellikes}>
        <CountViewUi
          icon="/assets/images/icons/eye.svg"
          count={views}
          color="black"
          flexDirection="column"
        />
        <CountViewUi
          icon="/assets/images/icons/star.svg"
          count={starRating}
          color="black"
          flexDirection="column"
        />
        <CountViewUi
          icon="/assets/images/icons/list.svg"
          count={355}
          color="black"
          flexDirection="column"
        />
      </div>
    </div>
  );
}
