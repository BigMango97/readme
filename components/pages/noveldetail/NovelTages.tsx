import React from 'react'
import TagUi from '@/components/ui/TagUi'
import style from "@/components/pages/noveldetail/NovelTages.module.css";
export default function NovelTages() {
  return (
    <div className={style.novelTagContainer}>
      <TagUi title="웹소설"/>
      <TagUi title="완결"/>
      <TagUi title="흑아인"/>
      <TagUi title="급상승어"/>
    </div>
  )
}
