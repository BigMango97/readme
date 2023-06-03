import React, { useEffect, useRef } from "react";
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

  useEffect(() => {
    const handleLoad = () => {
      const scrollPosition = localStorage.getItem("scrollPosition");
      if (scrollPosition !== null) {
        window.scrollTo(0, parseInt(scrollPosition, 10));
        localStorage.removeItem("scrollPosition");
      }
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, [router.pathname]);

  const handleGoBack = () => {
    const previousUrl = localStorage.getItem("previousUrl");
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (previousUrl && scrollPosition) {
      router.push(previousUrl).then(() => window.scrollTo(0, parseInt(scrollPosition)));
      localStorage.removeItem("previousUrl");
      localStorage.removeItem("scrollPosition");
    } else {
      router.back();
    }
  };

  return (
    <header className={style.detailHeadercontainer}>
      <div className={style.header}>
        <div className={style.leftmenu}>
          <Image
            src="/assets/images/icons/leftarrowpurple.svg"
            alt="left-arrow"
            width={15}
            height={15}
            priority
            onClick={handleGoBack}
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
  );
}
