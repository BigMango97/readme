import React from "react";
import Image from "next/image";
import style from "@/components/ui/NovelListItem.module.css";
import { useRouter } from "next/router";
import { allDetailDatatype } from "@/types/model/mainDataType";

const IS_READABLE_BY_All = 0;
const IS_NINETEEN_PLUS = 19;

function getGradeText(grade: number) {
  if (grade === IS_NINETEEN_PLUS) {
    return <p className={style.nineteenCheck}>{grade}</p>;
  }
  if (grade === IS_READABLE_BY_All) {
    return <p className={style.allCheck}>All</p>;
  }
  return <p className={style.basicCheck}>{grade}</p>;
}

export default function NovelListItem(props: {
  novelData: allDetailDatatype;
  key: number;
}) {
  const router = useRouter();
  const movePage = () => {
    if (props.novelData.episodeId === undefined) {
      router.push(`/noveldetail/${props.novelData.novelId}`);
    } else router.push(`/viewer/${props.novelData.episodeId}`);
  };
  return (
    <div className={style.allNovelList} onClick={movePage}>
      <div className={style.allNovelImgContainer}>
        <div className={style.allListImg}>
          <Image
            src={props.novelData.thumbnail}
            alt={"이미지"}
            width={500}
            height={500}
          />
        </div>
        {props.novelData.newChecking && (
          <div className={style.listNewIcon}>
            <Image
              src={"/assets/images/icons/NewIcon.svg"}
              alt={"이미지"}
              width={30}
              height={30}
            />
          </div>
        )}
        <div className={style.ageCheck}>
          {getGradeText(props.novelData.grade)}
        </div>
      </div>
      <div className={style.allNovelInfo}>
        <div className={style.allNovelStatus}>
          {props.novelData.serializationStatus}
        </div>
        <div className={style.allNovelTitle}>
          <p>{props.novelData.title}</p>
        </div>
        <div className={style.allNovelAuthor}>
          {props.novelData.author} | {props.novelData.genre}
        </div>
        <div className={style.allNovelStarpoint}>
          <Image
            src={"/assets/images/icons/star.svg"}
            alt={"이미지"}
            width={15}
            height={15}
          />
          <span>{props.novelData.starRating}</span>
          <Image
            src={"/assets/images/icons/list.svg"}
            alt={"이미지"}
            width={15}
            height={15}
          />
          <span>{props.novelData.episodeCount}</span>
        </div>
      </div>
    </div>
  );
}
