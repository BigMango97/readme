import React from "react";
import ReviewContainer from "../pages/viewer/StarRatingContainer";
import CommentsContainer from "../pages/viewer/CommentsContainer";
import style from "@/components/ui/SlideComponent.module.css";


type ActiveIconType =
  | "reviewRating"
  | "comment"
  | "beforenovel"
  | "nextnovel"
  | null;
interface SlideComponentProps {
  onClose: () => void;
  activeIcon?: ActiveIconType;
  novelId: number;
  title: string;
}
const ICON_TYPES = {
  REVIEW_RATING: "reviewRating",
  COMMENT: "comment",
  BEFORENOVEL: "beforenovel",
  NEXTNOVEL: "nextnovel",
};
export default function SlideComponent({
  onClose,
  activeIcon,
  novelId,
  title,
}: SlideComponentProps): JSX.Element {
  let content;
  switch (activeIcon) {
      case ICON_TYPES.REVIEW_RATING:
        content = <ReviewContainer novelId={novelId} onClose={onClose} />;
        break;
      case ICON_TYPES.COMMENT:
        content = <CommentsContainer novelId={novelId} title={title} />;
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
