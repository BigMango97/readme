import React, { useState, useEffect } from "react";
import style from "@/components/pages/viewer/Comments.module.css";
import NewUi from "@/components/ui/NewUi";
import LineSeparator from "@/components/ui/LineSeparator";
export default function Comments() {
  let [input, setInput] = useState("");
  console.log("input", input);

  return (
    <>
      <div className={style.commentsContainer}>
        <p>작성자 : dddddddddd </p>
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
      </div>
      <div className={style.CommentCard}>
        <div className={style.commentListInfo}>
          <div className={style.commentListTitle}>
            <div className={style.commentWriter}>밍개미</div>
            <NewUi />
          </div>
          <div className={style.commentDay}>2023.04.25</div>
        </div>
        <div className={style.comment}>
          무협 좀비아포칼립스는 ㄹㅇ 빡센데 ㄷㄷ 화전민촌들이 다 휩쓸리겟네
        </div>
        <div className={style.episodeIcons}>
          <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
        </div>
      </div>
      <LineSeparator colorline="grayline"/>
      <div className={style.CommentCard}>
        <div className={style.commentListInfo}>
          <div className={style.commentListTitle}>
            <div className={style.commentWriter}>밍개미</div>
            <NewUi />
          </div>
          <div className={style.commentDay}>2023.04.25</div>
        </div>
        <div className={style.comment}>
          무협 좀비아포칼립스는 ㄹㅇ 빡센데 ㄷㄷ 화전민촌들이 다 휩쓸리겟네
        </div>
        <div className={style.episodeIcons}>
          <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
        </div>
      </div>
      <LineSeparator colorline="grayline"/>
      <div className={style.CommentCard}>
        <div className={style.commentListInfo}>
          <div className={style.commentListTitle}>
            <div className={style.commentWriter}>밍개미</div>
            <NewUi />
          </div>
          <div className={style.commentDay}>2023.04.25</div>
        </div>
        <div className={style.comment}>
          무협 좀비아포칼립스는 ㄹㅇ 빡센데 ㄷㄷ 화전민촌들이 다 휩쓸리겟네
        </div>
        <div className={style.episodeIcons}>
          <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
        </div>
      </div>
    </>
  );
}
