import React from "react";
import style from "@/components/ui/SlideWebViewList.module.css";
import { Image } from "antd";
export default function SlideWebViewList() {
  return (
    <div className={style.mainWebNovelContainer}>
      <p>웹소설</p>
      <div className={style.mainWebNovelGenre}>
        <div className={style.mainWebNovelImg}>
          <Image
            src="/assets/images/dummy/mybooks01.jpg"
            alt="kakaologin"
            width={75}
            height={75}
          ></Image>
          <p>판타지</p>
        </div>
        <div className={style.mainWebNovelImg}>
          <Image
            src="/assets/images/dummy/mybooks01.jpg"
            alt="kakaologin"
            width={75}
            height={75}
          ></Image>
          <p>현판</p>
        </div>
        <div className={style.mainWebNovelImg}>
          <Image
            src="/assets/images/dummy/mybooks01.jpg"
            alt="kakaologin"
            width={75}
            height={75}
          ></Image>
          <p>로맨스</p>
        </div>
      </div>
      <div className={style.mainWebNovelGenre}>
        <div className={style.mainWebNovelImg}>
          <Image
            src="/assets/images/dummy/mybooks01.jpg"
            alt="kakaologin"
            width={75}
            height={75}
          ></Image>
          <p>로판</p>
        </div>
        <div className={style.mainWebNovelImg}>
          <Image
            src="/assets/images/dummy/mybooks01.jpg"
            alt="kakaologin"
            width={75}
            height={75}
          ></Image>
          <p>무협</p>
        </div>
        <div className={style.mainWebNovelImg}>
          <Image
            src="/assets/images/dummy/mybooks01.jpg"
            alt="kakaologin"
            width={75}
            height={75}
          ></Image>
          <p>드라마</p>
        </div>
      </div>
    </div>
  );
}
