import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "@/components/pages/library/PurchasedListItem.module.css";
import { purchasedNovelType } from "@/types/user/libraryType";

const IS_READABLE_BY_All = 0;
const IS_NINETEEN_PLUS = 19;

// function getGradeText(grade: number) {
//   if (grade === IS_NINETEEN_PLUS) {
//     return <p className={style.nineteenCheck}>{grade}</p>;
//   }
//   if (grade === IS_READABLE_BY_All) {
//     return <p className={style.allCheck}>All</p>;
//   }
//   return <p className={style.basicCheck}>{grade}</p>;
// }

export default function PurchasedListItem({
  purchasedData,
}: {
  purchasedData: purchasedNovelType;
}) {
  const router = useRouter();
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

  return (
    <div className={style.allNovelList}>
      <div className={style.allNovelContainer}>
        <div className={style.allNovelInfo}>
          <div className={style.allNovelSubInfo}>
            <div className={style.allNovelTitle}>{"소설제목"}</div>
            <div className={style.allEpisodeTitle}>{"에피제목"}</div>
            <div className={style.allNovelBottom}>
              <span>100P</span>
              <span>구매날짜 | {"2023-06-05"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
