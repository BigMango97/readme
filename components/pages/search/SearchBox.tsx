import React from "react";
import style from "@/components/pages/search/SearchBox.module.css";
import Image from "next/image";
export default function SearchBox() {
  return (
    <div className={style.searchBoxWarp}>
      <div className={style.searchBox}>
        <Image
          src="/assets/images/searchBar.png"
          alt="searchBox"
          width={340}
          height={40}
        />
        <input type="text" />
        <div className={style.searchIcon}>
          <Image
            src="/assets/images/icons/searchicon.png"
            alt="searchIcon"
            width={22}
            height={22}
          />
        </div>
      </div>
    </div>
  );
}
