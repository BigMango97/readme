import React, { useState } from "react";
import ReviewRating from "@/components/ui/ReviewRating";
import style from "@/components/pages/viewer/ReviewContainer.module.css";
export default function ReviewContainer() {
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleStarClick = (index: number): void => {
    let clickStates: boolean[] = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };
  return (
    <div className={style.reviewCotainer}>
      <div className={style.reviewTitle}>회차 별점 남기기</div>
      <ReviewRating clicked={clicked} onStarClick={handleStarClick} />
      <div className={style.checkBtn}>
        <button type="button">취소</button>
        <button type="button">확인</button>
      </div>
    </div>
  );
}
