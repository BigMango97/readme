import React, { useState } from "react";
import style from "@/components/pages/library/Library.module.css";
import Image from "next/image";

export default function MyBooks() {
  const [clickTab, setClickTab] = useState(0);

  const handleClickTabs = (clickTab: number) => {
    setClickTab(clickTab);
  };

  return (
    <>
      <div className={style.myBooksTopWrap}>
        <ul className={style.tabItem}>
          <li
            className={`${clickTab === 0 ? style.tabActive : null}`}
            onClick={() => handleClickTabs(0)}
          >
            최근
          </li>
          <li
            className={`${clickTab === 1 ? style.tabActive : null}`}
            onClick={() => handleClickTabs(1)}
          >
            좋아요
          </li>
          <li
            className={`${clickTab === 2 ? style.tabActive : null}`}
            onClick={() => handleClickTabs(2)}
          >
            구매작품
          </li>
        </ul>
      </div>
      {clickTab === 0 && (
        <div className={style.myBooksContentWrap} id="recentContent">
          <div className={style.recentSection}>
            <Image
              src="/assets/images/dummy/myBooks01.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            <div className={style.recentDescription}>
              <span id="title">천재 아이돌의 연예계 공략법</span>
              <ul>
                <li>현판</li>
                <li>글송이</li>
                <li>연재중</li>
              </ul>
              <p>
                이어보기{" "}
                <Image
                  src="/assets/images/icons/right-chevron.png"
                  alt="right-chevron"
                  width={22}
                  height={22}
                />
              </p>
            </div>
          </div>

          <div className={style.recentSection}>
            <Image
              src="/assets/images/dummy/myBooks01.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            <div className={style.recentDescription}>
              <span id="title">천재 아이돌의 연예계 공략법</span>
              <ul>
                <li>현판</li>
                <li>글송이</li>
                <li>연재중</li>
              </ul>
              <p>
                이어보기{" "}
                <Image
                  src="/assets/images/icons/right-chevron.png"
                  alt="right-chevron"
                  width={22}
                  height={22}
                />
              </p>
            </div>
          </div>

          <div className={style.recentSection}>
            <Image
              src="/assets/images/dummy/myBooks01.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            <div className={style.recentDescription}>
              <span id="title">천재 아이돌의 연예계 공략법</span>
              <ul>
                <li>현판</li>
                <li>글송이</li>
                <li>연재중</li>
              </ul>
              <p>
                이어보기{" "}
                <Image
                  src="/assets/images/icons/right-chevron.png"
                  alt="right-chevron"
                  width={22}
                  height={22}
                />
              </p>
            </div>
          </div>
        </div>
      )}
      {clickTab === 1 && (
        <div className={style.myBooksContentWrap} id="likeContent">
          {/* <div className={style.bookSection}>
            <Image
              src="/assets/images/dummy/myBooks02.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            악녀를 죽여줘
          </div>
          <div className={style.bookSection}>
            <Image
              src="/assets/images/dummy/myBooks02.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            악녀를 죽여줘
          </div>
          <div className={style.bookSection}>
            <Image
              src="/assets/images/dummy/myBooks02.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            악녀를 죽여줘
          </div>
          <div className={style.bookSection}>
            <Image
              src="/assets/images/dummy/myBooks02.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            악녀를 죽여줘
          </div> */}
        </div>
      )}
      {clickTab === 2 && (
        <div className={style.myBooksContentWrap} id="buyContent">
          <div className={style.bookSection}>
            <Image
              src="/assets/images/dummy/myBooks03.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            이 결혼은 어차피 망하게 되어 있다
          </div>
          <div className={style.bookSection}>
            <Image
              src="/assets/images/dummy/myBooks03.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            이 결혼은 어차피 망하게 되어 있다
          </div>
          <div className={style.bookSection}>
            <Image
              src="/assets/images/dummy/myBooks03.jpg"
              alt="logo"
              width={100}
              height={120}
            />
            이 결혼은 어차피 망하게 되어 있다
          </div>
        </div>
      )}
    </>
  );
}
