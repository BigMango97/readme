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
  console.log(dateString);

  // const movePage = () => {
  //   router.push(`/viewer/${novelData.episodeId}`).then(() => {
  //     window.scrollTo(0, 0);
  //   });
  // };
  // const handleNovelDetailClick = () => {
  //   localStorage.setItem("scrollPosition", window.pageYOffset.toString());
  //   localStorage.setItem("previousUrl", router.asPath);
  //   router.push(`/noveldetail/${novelData.novelId}`, undefined, {
  //     scroll: false,
  //   });
  // };
  const deletePurchasedHandle = async (recentId: number) => {
    // const res = await axios.delete(`/novels-service/v1/history/${recentId}`);
    // console.log(res.data);
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
        {/* <div className={style.right}>
          <Image
            src={"/assets/images/icons/close.svg"}
            alt="close Icon"
            width={20}
            height={20}
            onClick={() => deletePurchasedHandle(purchasedData.novelId)}
          />
        </div> */}
      </div>
    </div>
  );
}
