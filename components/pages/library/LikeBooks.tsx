import React, { useEffect, useState } from "react";
import axios from "@/configs/axiosConfig";
import { likeType } from "@/types/user/libraryType";
import { allDetailDatatype } from "@/types/model/mainDataType";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import NovelCardList from "./NovelCardList";

export default function LikeBooks() {
  const [likeNovelData, setLikeNovelData] = useState<allDetailDatatype[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/utils-service/v1/pick`);

        const res2 = await Promise.all(
          res.data.data.contents.map(async (item: likeType) => {
            const res3 = await axios.get(
              `/sections-service/v1/cards/novels/${item.novelsId}`
            );
            return res3.data.data;
          })
        );

        setLikeNovelData(res2);
      } catch (err) {
        console.log("Error >>", err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <NovelCardList
        data={likeNovelData}
        totalElements={likeNovelData ? likeNovelData.length : 0}
      />
    </>
  );
}
