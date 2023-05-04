import React from "react";
import style from "@/components/pages/noveldetail/CommentList.module.css";
import NewUi from "@/components/ui/NewUi";
import Image from "next/image";
export default function CommentList() {
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
        <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
      </div>

      <div className={style.CommentCard}>
        <div className={style.commentListInfo}>
          <div className={style.commentListTitle}>
            <div className={style.commentMyWrite}>Juliet(작성자)</div>
          </div>
          <div className={style.commentDay}>2023.04.25</div>
        </div>
        <div className={style.comment}>
          무협 좀비아포칼립스는 ㄹㅇ 빡센데 ㄷㄷ 화전민촌들이 다 휩쓸리겟네
        </div>
        <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
        <div className={style.episodeIcons}>
          <Image
            src="/assets/images/icons/write.svg"
            alt="left-arrow"
            width={20}
            height={20}
            priority
          />
          <Image
            src="/assets/images/icons/trash-2.svg"
            alt="left-arrow"
            width={20}
            height={20}
            priority
          />
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
        <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
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
        <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
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
        <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
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
        <div className={style.episodeTitle}>신과함께 레벨업 080화</div>
      </div>
    </>
  );
}
