import React, { useEffect, useState } from "react";
import style from "@/components/pages/library/MyBooks.module.css";
import axios from "@/configs/axiosConfig";
import { useCookies } from "react-cookie";
import { likeListType } from "@/types/user/likeType";

import { allDetailDatatype } from "@/types/model/mainDataType";
import NovelCardList from "./NovelCardList";

export default function MyBooks() {
  const [cookies] = useCookies(["uuid"]);
  const [userLikeList, setUserLikeList] = useState<likeListType>();
  const [likeNovelData, setLikeNovelData] = useState<allDetailDatatype[]>([]);
  useEffect(() => {
    axios.get(`/utils-service/v1/pick`).then((res) => {
      setUserLikeList({ likeList: res.data.data.contents });
      userLikeList &&
        userLikeList.likeList.map((item) => {
          axios
            .get(`/sections-service/v1/cards/novels/${item.novelsId}`)
            .then((res) => {
              console.log(res.data);
              setLikeNovelData([
                ...likeNovelData,
                {
                  novelId: res.data.data.novelId,
                  title: res.data.data.title,
                  description: res.data.data.description,
                  author: res.data.data.author,
                  genre: res.data.data.genre,
                  grade: res.data.data.grade,
                  thumbnail: res.data.data.thumbnail,
                  startDate: res.data.data.startDate,
                  views: res.data.data.views,
                  serializationStatus: res.data.data.serializationStatus,
                  tags: [res.data.data.tags],
                  scheduleId: res.data.data.scheduleId,
                  starRating: res.data.data.starRating,
                  serializationDays: res.data.data.serializationDays,
                  newChecking: res.data.data.newChecking,
                  episodeCount: res.data.data.episodeCount,
                  authorComment: res.data.data.authorComment,
                },
              ]);
            });
        });
    });
  }, []);

  console.log("likeNovelData", likeNovelData);

  return (
    <>
      {userLikeList ? (
        <NovelCardList
          data={likeNovelData}
          totalElements={likeNovelData.length}
        />
      ) : (
        <div className={style.container}>
          <p>최근 본 소설이 없습니다</p>
        </div>
      )}
    </>
  );
}
