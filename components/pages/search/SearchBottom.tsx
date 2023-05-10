import React from "react";
import style from "@/components/pages/search/SearchBottom.module.css";
import Image from "next/image";

export default function SearchBottom() {
  return (
    <div className={style.searchBottom}>
      <Image
        src="/assets/images/icons/searchClose.svg"
        alt="searchClose"
        width={60}
        height={60}
      />
    </div>
  );
}
