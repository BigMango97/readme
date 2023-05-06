import React from "react";
import Image from "next/image";
import style from "@/components/ui/NovelCard.module.css";

interface Props {
  styleType: "card" | "list";
}
export default function NovelCard({ styleType }: Props) {
  return (
    <div
      className={styleType === "card" ? style.allNovelCard : style.allNovelList}
    >
      <div className={style.allNovelImgContainer}>
        <div
          className={styleType === "card" ? style.allCardImg : style.allListImg}
        >
          <Image
            src={"/assets/images/dummy/product2.png"}
            alt={"이미지"}
            width={500}
            height={500}
          />
        </div>
        <div
          className={
            styleType === "card" ? style.cardNewIcon : style.listNewIcon
          }
        >
          <Image
            src={"/assets/images/icons/NewIcon.svg"}
            alt={"이미지"}
            width={30}
            height={30}
          />
        </div>
      </div>
      <div className={styleType === "list" ? style.allNovelInfo : ""}>
        <div className={style.allNovelStatus}>연재중</div>
        <div className={style.allNovelTitle}>
          <p>아카데미의 마피아가 되었다.</p>
        </div>
        <div className={style.allNovelAuthor}>문백경 | 판타지</div>
        <div className={style.allNovelStarpoint}>
          <Image
            src={"/assets/images/icons/star.svg"}
            alt={"이미지"}
            width={15}
            height={15}
          />
          <span>9.8</span>
          <Image
            src={"/assets/images/icons/list.svg"}
            alt={"이미지"}
            width={15}
            height={15}
          />
          <span>123</span>
        </div>
      </div>
    </div>
  );
}
