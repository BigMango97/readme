import React from "react";
import Router from "next/router";
import style from "@/components/pages/search/RecentSearchItems.module.css";
import Image from "next/image";
import { recentSearchWord } from "@/state/recentSearchWord";
import { useRecoilState } from "recoil";

export default function RecentSearchItems() {
  const [searchValue, setSearchValue] = useRecoilState(recentSearchWord);
  const handleRemoveKeyword = (text: string) => {
    setSearchValue((prev) => {
      const newList = prev.filter((item) => item !== text);
      localStorage.setItem("keywordList", JSON.stringify(newList));
      return newList;
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };
  const directKeywordPage = (index: string) => {
    const handleDirectKeywordPage = () => {
      Router.push(`/search?keyword=${index}`);
    };
    return handleDirectKeywordPage;
  };
  return (
    <>
      <div className={style.continer}>
        {searchValue.length == 0 ? (
          <div className={style.recentSearchNotKeyword}>
            <p>최근 검색어가 없습니다</p>
          </div>
        ) : (
          <div className={style.recentSearchKeyword}>
            {searchValue.map((index, i) => (
              <div className={style.recentSearchContainer} key={i}>
                <div className={style.recentSearchWordList}>
                  <div
                    className={style.recentSearchTitle}
                    onClick={directKeywordPage(index)}
                  >
                    <div className={style.keywordtitle}>
                      {truncateText(index, 10)}
                    </div>
                  </div>
                  <div className={style.closebtn}>
                    <Image
                      src="/assets/images/icons/close.svg"
                      alt="searchIcon"
                      width={20}
                      height={20}
                      onClick={() => handleRemoveKeyword(index)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
