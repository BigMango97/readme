import React from "react";
import LineSeparator from "./LineSeparator";
import style from "@/components/ui/Comment.module.css";
import NewUi from "./NewUi";
export default function Comment() {
  return (
    <>
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
      <LineSeparator colorline="grayline" />
    </>
  );
}
