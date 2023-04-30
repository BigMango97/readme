import React from "react";
import Image from "next/image";

type Position = "relative" | "absolute";
type Color = "#5841E0" | "#9fabea"      //primary color, 톤다운파란, 
interface Props {
  width: number;
  height: number;
  backgroundwidth?: number;
  backgroundheight?: number;
  backgroundColor: Color;
  thumbnail: string;
  borderRadius?: string;
  marginbottom?: string;
  backposition?: Position;
  position?: Position;
  bottom?: string;
  right?: string;
  top?: string;
  left?: string;
}
export default function NovelCardImg(props: Props) {
  return (
    <div
      style={{
        width: props.backgroundwidth,
        height: props.backgroundheight,
        backgroundColor: props.backgroundColor,
        borderRadius: props.borderRadius,
        position: props.backposition,
        marginBottom: props.marginbottom,
      }}
    >
      <Image
        src={props.thumbnail}
        alt="썸네일 이미지"
        width={props.width}
        height={props.height}
        style={{
          position: props.position,
          right: props.right,
          bottom: props.bottom,
          top: props.top,
          left: props.left,
        }}
      />
    </div>
  );
}
