import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailinfo.module.css";
import CountViewUi from "@/components/ui/CountViewUi";
import NovelCard from "@/components/ui/NovelCardImg";
import NovelCardImg from "@/components/ui/NovelCardImg";
export default function NovelDetailInfo(props: {
  title: string;
  description: string;
  serializationStatus: string;
  genre: string;
  thumbnail: string;
  views: number;
  starRating: number;
}) {
  return (
    <div className={style.novelMainInfo}>
      <NovelCardImg
        width={200}
        height={200}
        backgroundwidth={150}
        backgroundheight={150}
        backgroundColor={"#9fabea"}
        thumbnail={props.thumbnail}
        backposition={"relative"}
        position={"absolute"}
        bottom={"0px"}
        right={"-20px"}
        borderRadius={"10px"}
      />
      <div className={style.detailinfo}>
        <p>{props.title}</p>
        <p>
          {props.description} | {props.serializationStatus} |{props.genre}
        </p>
      </div>
      <div className={style.detailnovellikes}>
        <CountViewUi
          icon="/assets/images/icons/eye.svg"
          count={props.views}
          color="black"
          flexDirection="column"
        />
        <CountViewUi
          icon="/assets/images/icons/star.svg"
          count={props.starRating}
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
