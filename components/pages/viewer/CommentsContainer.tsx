import React from "react";
import style from "@/components/pages/viewer/CommentsContainer.module.css";
import WriteComment from "@/components/ui/WriteComment";
import Comment from "@/components/ui/Comment";
export default function CommentContainer() {
  return (
    <>
      <div className={style.commentsTitle}>댓글(234)</div>
      <div className={style.commentsList}>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </div>
      <WriteComment />
    </>
  );
}
