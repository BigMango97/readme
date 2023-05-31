import React from "react";
import TagUi from "@/components/ui/TagUi";
import style from "@/components/pages/noveldetail/NovelTages.module.css";
import { allDetailTag } from "@/types/model/mainDataType";
export default function NovelTages(props: { tags: allDetailTag[] }) {
  return (
    <div className={style.novelTagContainer}>
      {props.tags.map((tag) => (
        <div key={tag.id}>
          <TagUi title={tag.name} />
        </div>
      ))}
    </div>
  );
}
