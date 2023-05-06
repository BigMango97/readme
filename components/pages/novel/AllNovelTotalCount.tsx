import React from "react";
import Image from "next/image";
import style from "@/components/pages/novel/AllNovelTotalCount.module.css";

export default function AllNovelTotalCount() {
  return (
    <div className={style.container}>
      <div>소설 23141건</div>
      <div className={style.allNovelTotalIcon}>
        <Image
          src="/assets/images/icons/book-open.svg"
          alt="left-arrow"
          width={20}
          height={20}
          priority
        />
        <Image
          src="/assets/images/icons/book.svg"
          alt="left-arrow"
          width={20}
          height={20}
          priority
        />
      </div>
    </div>
  );
}
