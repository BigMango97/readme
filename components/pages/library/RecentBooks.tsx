import React, { useEffect, useState } from "react";
import axios from "@/configs/axiosConfig";
import { likeType, recentReadType } from "@/types/user/libraryType";
import { allDetailDatatype } from "@/types/model/mainDataType";
import NovelCardList from "./NovelCardList";

export default function RecentBooks() {
  const [novelData, setNovelData] = useState<allDetailDatatype[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/novels-service/v1/history`);
        const res2 = await Promise.all(
          res.data.data.contents.map(async (item: recentReadType) => {
            const res3 = await axios.get(
              `/sections-service/v1/cards/novels/${item.novelId}`
            );
            return {
              novelId: res3.data.data.novelId,
              title: res3.data.data.title,
              description: res3.data.data.description,
              author: res3.data.data.author,
              genre: res3.data.data.genre,
              grade: res3.data.data.grade,
              thumbnail: res3.data.data.thumbnail,
              startDate: res3.data.data.startDate,
              views: res3.data.data.views,
              serializationStatus: res3.data.data.serializationStatus,
              tags: [res3.data.data.tags],
              scheduleId: res3.data.data.scheduleId,
              starRating: res3.data.data.starRating,
              serializationDays: res3.data.data.serializationDays,
              newChecking: res3.data.data.newChecking,
              episodeCount: res3.data.data.episodeCount,
              authorComment: res3.data.data.authorComment,
              episodeId: item.episodeId,
              recentId: item.id,
            };
          })
        );
        setNovelData(res2);
      } catch (err) {
        console.log("Error >>", err);
      }
    };
    getData();
  }, []);
  console.log(novelData);
  return (
    <>
      <NovelCardList
        novelData={novelData}
        purchasedData={[]}
        totalElements={novelData ? novelData.length : 0}
      />
    </>
  );
}
