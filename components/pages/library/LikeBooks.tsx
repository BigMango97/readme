import React, { useEffect, useState } from "react";
import axios from "@/configs/axiosConfig";
import { likeListType } from "@/types/user/likeType";
import { allDetailDatatype } from "@/types/model/mainDataType";
import NovelCardList from "./NovelCardList";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function LikeBooks() {
  const [userLikeList, setUserLikeList] = useState<likeListType>({
    likeList: [],
  });
  const [likeNovelData, setLikeNovelData] = useState<allDetailDatatype[]>([]);
  //const [likeNovelData, setLikeNovelData] = useState<allDetailDataListType>();
  const [cookies] = useCookies(["uuid"]);
  let dataList: allDetailDatatype[] = [];
  useEffect(() => {
    axios
      .get(`/utils-service/v1/pick`, {
        headers: {
          uuid: `${cookies.uuid}`,
        },
      })
      .then((res) => {
        setUserLikeList({ likeList: res.data.data.contents });
      });
  }, []);
  //console.log("userLikeList", userLikeList);
  useEffect(() => {
    userLikeList &&
      userLikeList.likeList.map((item) => {
        axios
          .get(`/sections-service/v1/cards/novels/${item.novelsId}`)
          .then((res) => {
            dataList.push(res.data.data);
            //console.log("res.data.data", res.data.data);
            // setLikeNovelData({
            //   ...likeNovelData,
            //   allDetailDataList: [res.data.data],
            // });
            // setLikeNovelData({
            //   allDetailDataList: [res.data.data],
            // });
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
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [, userLikeList]);
  //console.log("likeNovelData", likeNovelData);
  return (
    <>
      <NovelCardList
        data={likeNovelData}
        totalElements={likeNovelData ? likeNovelData.length : 0}
      />
    </>
  );
}
