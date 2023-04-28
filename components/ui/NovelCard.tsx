import React from "react";
import style from "@/components/ui/NovelCard.module.css";
import Image from "next/image";
export default function NovelCard(props:{width:number,height:number}) {
  return ( 
    <div className={style.detailImgWrap} style={{width:props.width,height:props.height}} >
      <Image
        src="/assets/images/dummy/bestItem01.png"
        alt="dsddd"
        width={props.width}
        height={props.height}
      />
    </div>
  );
}
