import React from "react";
import style from "@/components/pages/mypage/TermsConditions.module.css";
import { termsCondition } from "@/data/termsConditionData";
import Image from "next/image";
export default function TermsConditions(props: {
  setMenuId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const clickClose = () => {
    props.setMenuId(0);
  };
  return (
    <div className={style.container}>
      <Image
        src={"/assets/images/icons/close.svg"}
        alt="close"
        width={45}
        height={45}
        onClick={() => clickClose()}
      />
      <div className={style.title}>ReadMe 이용약관</div>
      <div className={style.termsTitle}>제1장 총칙</div>
      <div className={style.content}>
        {termsCondition.map((item) => (
          <div key={item.id}>
            <span className={style.articleTitle}>{item.articleTitle}</span>
            <span className={style.articleContents}>
              {item.articleContents}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
