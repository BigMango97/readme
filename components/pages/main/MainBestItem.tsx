import React from "react";
import style from "@/components/pages/main/MainBestItem.module.css";
import CountViewUi from "@/components/ui/CountViewUi";
import Image from "next/image";
import { besteventNovelQueryType } from "@/types/service/section-service";

interface Props {
  data: besteventNovelQueryType;
  bestImage: string;
}
export default function MainBestItem({ data, bestImage }: Props) {
  return (
    <section className={style.bestItem}>
      <h2>Best Item</h2>
      {data && (
        <div className={style.bestItemCardWrap}>
          <h3>{data.title}</h3>
          <p>{data.author}</p>
          <p>
            {data.serializationStatus} | {data.genre}
          </p>

          <div className={style.bestItemImgWrap}>
            {bestImage && (
              <Image
                src={bestImage}
                alt={data.title}
                width={300}
                height={300}
              />
            )}
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
  );
}
