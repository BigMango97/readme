import React from "react";
import Image from "next/image";
import style from "@/components/pages/noveldetail/NovelDetailHeader.module.css";
import { useRouter } from "next/router";
export default function NovelDatailHeader(props: {
  title: string;
  author: string;
  genre: string;
  serializationStatus: string;
  serializationDays: string;
}) {
  const router = useRouter();
  return (
    <>
      <header className={style.detailHeadercontainer}>
        <div className={style.header}>
          <div className={style.leftmenu}>
            <Image
              src="/assets/images/icons/leftarrowpurple.svg"
              alt="left-arrow"
              width={15}
              height={15}
              priority
              onClick={() => router.back()}
            />
          </div>
          <div className={style.novelDetailTitle}>
            <div className={style.noevelMainTitle}>{props.title}</div>
            <p>
              {props.author} | {props.serializationStatus} | {props.genre} |{" "}
              {props.serializationDays}
            </p>
          </div>
        </div>
      </header>
    </>
  );
}
