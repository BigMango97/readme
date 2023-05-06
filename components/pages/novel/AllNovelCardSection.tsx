import React from "react";
import style from "@/components/pages/novel/AllNovelCardSection.module.css";
import NovelCard from "@/components/ui/NovelCard";

export default function AllNovelCardSection() {
  return (
    <div className={style.novelContainer}>
      <NovelCard styleType="card" />
      <NovelCard styleType="card" />
      <NovelCard styleType="list" />
      <NovelCard styleType="list" />
      <NovelCard styleType="list" />
      <NovelCard styleType="list" />
    </div>
  );
}
