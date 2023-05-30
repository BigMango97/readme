import React from "react";
import ReviewContainer from "../pages/viewer/ReviewContainer";
import CommentsContainer from "../pages/viewer/CommentsContainer";
import style from "@/components/ui/SlideComponent.module.css";

type ActiveIconType = "menu" | "reviewRating" | "comment" | "beforenovel" | "nextnovel" | null;

interface SlideComponentProps {
  onClose: () => void;
  activeIcon?: ActiveIconType;
  novelId:number
}
const ICON_TYPES = {
  MENU: "menu",
  REVIEW_RATING: "reviewRating",
  COMMENT: "comment",
  BEFORENOVEL : "beforenovel",
  NEXTNOVEL : "nextnovel",  
};

export default function SlideComponent({
  onClose,
  activeIcon,
  novelId
}: SlideComponentProps): JSX.Element {
  let content;
  switch (activeIcon) {
    case ICON_TYPES.MENU:
      content = <div>수정필요</div>;
      break;
    case ICON_TYPES.REVIEW_RATING:
      content = <ReviewContainer novelId={novelId} onClose={onClose}/>;
      break;
    case ICON_TYPES.COMMENT:
      content = <CommentsContainer novelId={novelId}/>;
      break;
    case ICON_TYPES.BEFORENOVEL:
      content = <div>수정필요</div>;
      break;
    case ICON_TYPES.NEXTNOVEL:
      content = <div>수정필요</div>;
      break;
  }

  return (
    <div
      className={`${style.container} ${
        activeIcon !== null ? style.shown : style.hidden
      }`}
    >
      <div className={style.closeBtn} onClick={onClose} />
      <div className={style.content}>{content}</div>
    </div>
  );
}
