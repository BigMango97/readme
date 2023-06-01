import React, { useEffect, useState } from "react";
import { MainBestData } from "@/datas/dummy/mainBestItemData";
import { mainBestItemsType } from "@/types/model/mainDataType";
import style from "@/components/pages/main/MainBestItem.module.css";
import CountViewUi from "@/components/ui/CountViewUi";
import Image from "next/image";

interface MainBestItemProps {
  data: dataType;
  bestImage:string;
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
  serializationStatus:string
}
export default function MainBestItem({ data, bestImage }: MainBestItemProps) {

  return (
    <section className={style.bestItem}>
      <h2>Best Item</h2>
      {data && (
        <div className={style.bestItemCardWrap}>
          <h3>{data.title}</h3>
          <p>
            {data.author}
          </p>
          <p>
            {data.serializationStatus} | {data.genre}
          </p>
  
          <div className={style.bestItemImgWrap}>
            <Image
              src={bestImage}
              alt={data.title}
              width={300}
              height={300}
            />
          </div>
          <div className={style.viewCountWrap}>
            <CountViewUi
              icon="/assets/images/icons/eye.svg"
              count={data.views}
              color="white"
              flexDirection="row"
            />
            <CountViewUi
              icon="/assets/images/icons/star.svg"
              count={data.starRating}
              color="white"
              flexDirection="row"
            />
            <CountViewUi
              icon="/assets/images/icons/list.svg"
              count={data.episodeCount}
              color="white"
              flexDirection="row"
            />
          </div>
        </div>
      )}
    </section>
  )
}