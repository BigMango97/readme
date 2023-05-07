import React from "react";
import Image from "next/image";
export default function CloseButton(props: { width: number; height: number }) {
  return (
    <Image
      src="/assets/images/icons/close.svg"
      alt="searchClose"
      width={props.width}
      height={props.height}
    />
  );
}
