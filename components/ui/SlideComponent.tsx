import React, { useState } from "react";
import { useInView } from "react-intersection-observer";
import ReviewContainer from "../pages/viewer/StarRatingContainer";
import CommentsContainer from "../pages/viewer/CommentsContainer";
import style from "@/components/ui/SlideComponent.module.css";
import EpisodeInfo from "../pages/noveldetail/EpisodeInfo";
import { SortType } from "../pages/noveldetail/NovelDetailMenu";
import { useInfiniteQuery } from "react-query";
import axios from "@/configs/axiosConfig";
import { useEffect } from "react";

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
  const fetchEpisodes = async ({ pageParam = 0 }) => {
    const response = await axios.get(
      `/sections-service/v1/cards/episodes/${novelId}?pagination=${pageParam}&sort=${sort}`
    );
    return response.data;
  };
  const [sort, setSort] = useState<SortType>(SORT_TYPES.RECENT);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  const handleSort = (newSort: SortType) => {
    setSort(newSort);
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery(["episodes", novelId, sort], fetchEpisodes, {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage?.data?.page ?? 0;
        const totalPages = lastPage?.data?.totalPages ?? 0;
        if (currentPage < totalPages) {
          return currentPage + 1;
        }
        return null;
      },
      keepPreviousData: true,
    });

  let content;

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
