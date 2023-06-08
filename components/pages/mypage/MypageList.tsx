import React, { useState } from "react";
import style from "@/components/pages/mypage/MypageList.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { mypageMenu } from "@/datas/staticData";
import { useRouter } from "next/router";

export default function MypageList(props: {
  setMenuId: React.Dispatch<React.SetStateAction<number>>;
}) {
  const clickHandle = (menuId: number) => {
    props.setMenuId(menuId);
  };
  return (
    <>
      <div className={style.mypageListContainer}>
        {mypageMenu.map((index) => (
          <div
            className={style.mypageList}
            key={index.id}
            onClick={() => clickHandle(index.id)}
          >
            <p>{index.title}</p>
            <LineSeparator colorline="grayline" />
          </div>
        ))}
      </div>
    </>
  );
}
