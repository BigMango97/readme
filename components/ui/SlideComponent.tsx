import React from "react";
import style from "@/components/ui/SlideComponent.module.css";
import ReviewContainer from "../pages/viewer/ReviewContainer";
import CommentsContainer from "../pages/viewer/CommentsContainer";
interface SlideComponentProps {
  onClose: () => void;
  activeIcon?: string | null | undefined;
  novelId:number
}

export default function SlideComponent({
  onClose,
  activeIcon,
  novelId
}: SlideComponentProps) {
  let content;
  switch (activeIcon) {
    case "menu":
      content = <div>수정필요</div>;
      break;
    case "reviewRating":
      content = <ReviewContainer novelId={novelId} onClose={onClose}/>;
      break;
    case "comment":
      content = <CommentsContainer />;
      break;
    case "beforenovel":
      content = <div>수정필요</div>;
      break;
    case "nextnovel":
      content = <div>수정필요</div>;
      break;
  }

  return (
    <div
      className={`${style.container} ${
        activeIcon !== null ? style.show : style.noshow
      }`}
    >
      <div className={style.closeBtn} onClick={onClose} />
      <div className={style.content}>{content}</div>
    </div>
  );
}
