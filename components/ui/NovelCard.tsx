import React from "react";
import style from "@/components/ui/NovelCard.module.css";
import Image from "next/image";
export default function NovelCard(props: {
  width: number;
  height: number;
  backgroundwidth:number;
  backgroundheight:number;
  backgroundColor:string;
  thumbnail: string;
}) {
  return (
    <div
      className={style.detailImgWrap}
      style={{ width: props.backgroundwidth, height: props.backgroundheight }}
    >
      <Image
        src={props.thumbnail}
        alt="썸네일 이미지"
        width={props.width}
        height={props.height}
      />
    </div>
  );
}
