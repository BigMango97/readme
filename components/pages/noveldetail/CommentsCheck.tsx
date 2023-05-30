import LineSeparator from "@/components/ui/LineSeparator";
import React from "react";
import style from "@/components/pages/noveldetail/CommentsCheck.module.css";
interface Props{
  commentcount:number
}
export default function CommentsCheck({commentcount}:Props) {
  return (
    <div className={style.container}>
      <div>댓글 {commentcount}</div>
      <LineSeparator colorline="greenline" />
    </div>
  );
}
