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
  const [purchasedData, setPurchasedData] = useState<purchasedNovelType[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(
          `/payments-service/v1/payments/getAllPurchased`
        );
        const replaceStr = res.data.replace("event:PurchasedInfoResult", "");
        const data = JSON.parse(replaceStr.replace("data:", ""));
        console.log(data);
        // const res2 = await Promise.all(
        //   data.map(async (item: purchasedNovelType) => {
        //     const res3 = await axios.get(
        //       `/sections-service/v1/cards/novels/${item.novelId}`
        //     );
        //     return res3.data.data;
        //   })
        // );
        setPurchasedData(data);
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
        novelData={[]}
        purchasedData={purchasedData}
        totalElements={purchasedData ? purchasedData.length : 0}
      />
    </>
  );
}
