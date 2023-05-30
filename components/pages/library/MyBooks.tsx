import React, { useEffect, useState } from "react";
import axios from "@/configs/axiosConfig";
import { likeListType } from "@/types/user/likeType";
import {
  allDetailDataListType,
  allDetailDatatype,
} from "@/types/model/mainDataType";
import NovelCardList from "./NovelCardList";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

export default function MyBooks() {
  const [userLikeList, setUserLikeList] = useState<likeListType>({
    likeList: [],
  });
  //const [likeNovelData, setLikeNovelData] = useState<allDetailDatatype[]>([]);
  const [likeNovelData, setLikeNovelData] = useState<allDetailDataListType>();
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
            console.log("res.data.data", res.data.data);
            setLikeNovelData({
              allDetailDataList: [...dataList, res.data.data],
            });
          })
          .catch((error) => {
            console.log(error);
          });
      });
  }, [userLikeList]);
  //console.log("likeNovelData", likeNovelData);
  return (
    <>
      <NovelCardList
        data={likeNovelData}
        totalElements={
          likeNovelData ? likeNovelData.allDetailDataList.length : 0
        }
      />
    </>
  );
}
