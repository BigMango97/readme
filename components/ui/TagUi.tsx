import React from "react";
import style from "@/components/ui/TagUi.module.css";
export default function TagUi(props: { title: string }) {
  return (
    <div className={style.tags}>
      <div className={style.tagtitle}>
        <p>{props.title}</p>
      </div>
    </div>
  );
}
