import LineSeparator from "@/components/ui/LineSeparator";
import React from "react";
import style from "@/components/pages/noveldetail/CommentsCheck.module.css";
export default function CommentsCheck() {
  return (
    <div className={style.container}>
      <div>댓글 320</div>
      <LineSeparator
        backgroundcolor={"#7fffa3"}
        width="65%"
        height="2px"
        margin="1rem 0rem"
      />
    </div>
  );
}
