import React from "react";
import Image from "next/image";
export default function CloseButton() {
  return (
    <Image
      src="/assets/images/icons/close.svg"
      alt="searchClose"
      width={18}
      height={18}
    />
  );
}
