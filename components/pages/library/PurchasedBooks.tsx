import React, { useEffect, useState } from "react";
import axios from "@/configs/axiosConfig";
import {
  likeType,
  purchasedNovelType,
  recentReadType,
} from "@/types/user/libraryType";
import { allDetailDatatype } from "@/types/model/mainDataType";
import NovelCardList from "./NovelCardList";
import dayjs from "dayjs";

export default function PurchasedBooks() {
  const [purchasedData, setPurchasedData] = useState<purchasedNovelType[]>([
    { novelId: 0, novelTitle: "string", epiTitle: "string", buyDate: dayjs() }, //todo :지우기
  ]);

  useEffect(() => {
    const getData = async () => {
      // try {
      //   const res = await axios.get(`/novels-service/v1/getPurchased`);
      //   const res2 = await Promise.all(
      //     res.data.data.contents.map(async (item: purchasedNovelType) => {
      //       const res3 = await axios.get(
      //         `/sections-service/v1/cards/novels/${item.novelId}`
      //       );
      //       return res3.data.data;
      //     })
      //   );
      //   setPurchasedData(res2);
      // } catch (err) {
      //   console.log("Error >>", err);
      // }
    };
    getData();
  }, []);
  console.log(purchasedData);
  return (
    <>
      <NovelCardList
        novelData={[]}
        purchasedData={purchasedData}
        totalElements={purchasedData ? purchasedData.length : 0}
      />
    </>
  );
}
