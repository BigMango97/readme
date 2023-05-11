import React from "react";
import style from "@/components/pages/mypage/MypageList.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { mypageMenu } from "@/datas/staticData";
export default function MypageList() {
  return (
    <>
      <div className={style.mypageListContainer}>
        {mypageMenu.map((index) => (
          <div className={style.mypageList}>
            <p>{index.title}</p>
            <LineSeparator colorline="grayline" />
          </div>
        ))}
      </div>
    </>
  );
}
