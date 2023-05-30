import React, { useEffect, useState } from "react";
import style from "@/components/pages/library/MyBooks.module.css";
import axios from "@/configs/axiosConfig";
import { useCookies } from "react-cookie";
import { likeListType } from "@/types/user/likeType";

import AllNovelCardSection from "../novel/AllNovelCardSection";

export default function MyBooks() {
  const [cookies] = useCookies(["uuid"]);
  const [userLikeList, setUserLikeList] = useState<likeListType>({
    likeList: [],
  });
  useEffect(() => {
    axios.get(`/utils-service/v1/pick`).then((res) => {
      console.log(res);
      setUserLikeList({ likeList: res.data.data.contents });
    });
  }, []);

  return (
    <>
      {/* {userLikeList ? (
        <AllNovelCardSection
        data={"소설데이터"}
        totalElements={0}
      />
      ) : (
        <div className={style.container}>
          <p>최근 본 소설이 없습니다</p>
        </div>
      )} */}
    </>
  );
}
