import React, { useEffect, useState } from "react";
import axios from "@/configs/axiosConfig";
import { likeListType, likeType } from "@/types/user/likeType";
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
  const [cookies] = useCookies(["uuid", "accessToken"]);

  //let dataList: allDetailDatatype[] = [];

  useEffect(() => {
    const getData = async () => {
      try {
        // const res = await axios.get(`/utils-service/v1/pick`, {
        //   headers: { uuid: `${cookies.uuid}` },
        // }
        // );
        const res = await axios.get(`/utils-service/v1/pick`);

        const res2 = await Promise.all(
          res.data.data.contents.map(async (item: likeType) => {
            const res3 = await axios.get(
              `/sections-service/v1/cards/novels/${item.novelsId}`
            );
            return res3.data.data;
            // setLikeNovelData([...likeNovelData, res2.data.data]);
            // dataList.push(res2.data.data);
          })
        );
        //console.log(res2);
        setLikeNovelData(res2);
      } catch (err) {
        console.log("Error >>", err);
      }
    };
    getData();
  }, []);

  //onsole.log("likeNovelData", likeNovelData);
  return (
    <>
      <NovelCardList
        data={likeNovelData}
        totalElements={likeNovelData ? likeNovelData.length : 0}
      />
    </>
  );
}
