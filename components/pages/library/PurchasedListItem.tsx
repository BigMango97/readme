import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "@/components/pages/library/PurchasedListItem.module.css";
import { purchasedNovelType } from "@/types/user/libraryType";
import axios from "@/configs/axiosConfig";

export default function PurchasedListItem({
  purchasedData,
}: {
  purchasedData: purchasedNovelType;
}) {
  const router = useRouter();
  const dateArray = purchasedData.purchasedDate.slice(0, 3);
  const dateString = dateArray.toString().replaceAll(",", "-");

  const deletePurchasedHandle = async (recentId: number) => {
    // const res = await axios.delete(`/novels-service/v1/history/${recentId}`);
  };

  return (
    <div className={style.allNovelList}>
      <div className={style.itemRow}>
        <div className={style.allNovelContainer}>
          <div className={style.allNovelInfo}>
            <div className={style.allNovelSubInfo}>
              <div className={style.allNovelTitle}>
                {purchasedData.novelTitle}
              </div>
              <div className={style.allEpisodeTitle}>
                {purchasedData.episodeTitle}
              </div>
              <div className={style.allNovelBottom}>
                <span>100P</span>
                <span>구매날짜 | {dateString}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
