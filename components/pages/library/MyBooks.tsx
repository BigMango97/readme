import React, { useState } from "react";
import style from "@/components/pages/library/Library.module.css";
import Image from "next/image";

export default function MyBooks() {
  const [clickTab, setClickTab] = useState(0);

  const handleClickTabs = (clickTab:number) => {
    setClickTab(clickTab)
  }

  return (
    <>
      <div className={style.myBooksTopWrap}>
        <ul className={style.tabItem}>
          <li className={`${clickTab === 0 ? style.tabActive : null}`} 
          onClick={()=>handleClickTabs(0)}>
            전체도서
          </li>
          <li className={`${clickTab === 1 ? style.tabActive : null}`} 
          onClick={()=>handleClickTabs(1)}>
            책장</li>
        </ul>
      </div>
      <div className={style.myBooksContentWrap}>
        {clickTab===0 &&(
          <div className={style.tabContent} id="allBooksContent">
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks01.jpg"
            alt="logo"
            width={100}
            height={120}
          />
        </div>
        )}
        {clickTab===1&&(
          <div className={style.tabContent} id="bookshelfContent">
          <Image
            src="/assets/images/dummy/myBooks02.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks02.jpg"
            alt="logo"
            width={100}
            height={120}
          />
          <Image
            src="/assets/images/dummy/myBooks02.jpg"
            alt="logo"
            width={100}
            height={120}
          />
        </div>
        )}
        
      </div>
    </>
  );
}
