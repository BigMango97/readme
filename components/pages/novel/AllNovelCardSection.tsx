import React from "react";
import style from "@/components/pages/novel/AllNovelCardSection.module.css";
import NovelCard from "@/components/ui/NovelCard";
import { useEffect } from "react";
import axios from "axios"
import { useState } from "react";
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
