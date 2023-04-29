import React from "react";
import style from "@/components/ui/NovelCard.module.css";
import Image from "next/image";
export default function NovelCard(props: {
  width: number;
  height: number;
  backgroundwidth?:number;
  backgroundheight?:number;
  thumbnail: string;
  backgroundColor:'rgb(229,229,229)' | 'rgb(110,72,235)' | 'F8FAFF'; /*회색, 보라, 흰*/
}) {
  return (
    <div
      className={style.detailImgWrap}
      style={{ width: props.backgroundwidth, height: props.backgroundheight, backgroundColor:props.backgroundColor }}
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
