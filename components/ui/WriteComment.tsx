import React, { useState } from "react";
import style from "@/components/ui/WriteComment.module.css";

export default function WriteComment() {
  let [input, setInput] = useState("");
  return (
    <div className={style.inputContainer}>
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
        placeholder="댓글을 입력해주세요"
      />
      <div className={style.commentsBtnContainer}>
        <button type="button" className={style.commentsBtn}>
          등록
        </button>
      </div>
    </div>
  );
}
