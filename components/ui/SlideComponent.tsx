import React, { Dispatch, SetStateAction, useEffect } from "react";
import ReviewContainer from "../pages/viewer/StarRatingContainer";
import CommentsContainer from "../pages/viewer/CommentsContainer";
import style from "@/components/ui/SlideComponent.module.css";
import { useRouter } from "next/router";
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
  slideOpen: boolean;
  setSlideOpen: Dispatch<SetStateAction<boolean>>;
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
  slideOpen,
  setSlideOpen,
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
  const router = useRouter();
  useEffect(() => {
    const handleRouteChange = () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

  useEffect(() => {
    if (slideOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [slideOpen]);

  return (
    <div
      className={
        slideOpen
          ? `${style.container} ${style.shown}`
          : `${style.container} ${style.hidden}`
      }
    >
      <div className={style.closeBtn} onClick={() => setSlideOpen(false)} />
      <div className={style.content}>{content}</div>
    </div>
  );
}
