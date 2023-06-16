import React from "react";
import style from "@/components/pages/viewer/NovelPageNumber.module.css";
interface Props {
  currentPage: number;
  totalPages: number;
}
export default function NovelPageNumber({ currentPage, totalPages }: Props) {
  return (
    <div className={style.container}>
      {currentPage}/{totalPages}
    </div>
  );
}
