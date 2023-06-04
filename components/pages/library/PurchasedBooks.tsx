import React, { useEffect, useState } from "react";
import axios from "@/configs/axiosConfig";
import {
  likeType,
  purchasedNovelType,
  recentReadType,
} from "@/types/user/libraryType";
import { allDetailDatatype } from "@/types/model/mainDataType";
import NovelCardList from "./NovelCardList";

export default function PurchasedBooks() {
  const [purchasedData, setPurchasedData] = useState<purchasedNovelType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`/novels-service/v1/history`);
        const res2 = await Promise.all(
          res.data.data.contents.map(async (item: recentReadType) => {
            const res3 = await axios.get(
              `/sections-service/v1/cards/novels/${item.novelId}`
            );
          })
        );
        setPurchasedData(res2);
      } catch (err) {
        console.log("Error >>", err);
      }
    };
    getData();
  }, []);
  console.log(purchasedData);
  return (
    <>
      <NovelCardList
        data={purchasedData}
        totalElements={purchasedData ? purchasedData.length : 0}
      />
    </>
  );
}
