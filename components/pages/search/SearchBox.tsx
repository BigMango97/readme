import { useRecoilState } from "recoil";
import React, { ChangeEvent, useState } from "react";
import Router, { useRouter } from "next/router";
import Image from "next/image";
import style from "@/components/pages/search/SearchBox.module.css";
import { recentSearchWord } from "@/state/recentSearchWord";
import { searchDataType } from "@/types/model/searchDataType";
import NovelCardItem from "@/components/ui/NovelCardItem";

export default function SearchBox(props: { data: searchDataType[] }) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useRecoilState(recentSearchWord);
  const [inputData, setInputData] = useState<string>("");
  const VALUE = router.query.keyword;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
  };

  const handleSearchKeyword = () => {
    if (!searchValue.includes(inputData) && inputData.length > 0) {
      Router.push(`/search?keyword=${inputData}`);
      setSearchValue((prev) => [inputData, ...prev.slice(0, 9)]);
      setInputData("");
    } else if (searchValue.includes(inputData) && inputData.length > 0) {
      Router.push(`/search?keyword=${inputData}`);
      const newList = [
        inputData,
        ...searchValue.filter((item) => item !== inputData),
      ];
      setSearchValue(newList.slice(0, 10));
      setInputData("");
    }
  };

  return (
    <>
      <div className={style.searchBoxWarp}>
        <div className={style.searchBox}>
          <input
            type="text"
            className={style.inputText}
            value={inputData}
            placeholder="검색어를 입력하세요"
            onChange={handleChange}
          />
          <div className={style.searchIcon}>
            <Image
              src="/assets/images/icons/searchicon.png"
              alt="searchIcon"
              width={22}
              height={22}
              onClick={handleSearchKeyword}
            />
          </div>
        </div>
      </div>
      <div className={style.novelContainer}>
        {props.data && props.data.length > 0 ? (
          <>
            <div className={style.novelContainerTitle}>
              <p>{`"${VALUE}"의 검색결과`}</p>
              <p>{`총 ${props.data.length}건`}</p>
            </div>
            <div className={style.novelInfo}>
              {props.data.map((item) => (
                <NovelCardItem
                  novelId={item.novelId}
                  key={item.novelId}
                  thumbnail={item.thumbnail}
                  serializationStatus={item.serializationStatus}
                  title={item.title}
                  author={item.author}
                  starRating={item.starRating}
                  genre={item.genre}
                  grade={item.grade}
                  newChecking={item.newChecking}
                  imgSize="50%"
                  episodeCount={item.episodeCount}
                />
              ))}
            </div>
          </>
        ) : props.data === undefined ? null : (
          <div className={style.novelContainerTitle}>
            <p>{`"${VALUE}"의 검색결과`}</p>
            <div className={style.notData}>검색결과가 없습니다</div>
          </div>
        )}
      </div>
    </>
  );
}
