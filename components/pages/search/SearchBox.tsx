import React from "react";
import style from "@/components/pages/search/SearchBox.module.css";
import Image from "next/image";
export default function SearchBox() {
  return (
    <div className={style.searchBoxWarp}>
      <div className={style.searchBox}>
        <input type="text" className={style.inputText} />
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
