import style from "@/components/pages/noveldetail/NovelDetailMenu.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import EpisodeInfo from "./EpisodeInfo";
import CommentsCheck from "./CommentsCheck";
import CommentList from "./CommentList";

import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import Config from "@/configs/config.export";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/router";
import axios from "axios";

export interface menuType {
  id: number;
  menu: string;
}
export default function NovelDetailMenu(props: {
  novelId: number;
  description: string;
  authorComment: string;
}) {
  const router = useRouter();
  const menulist: menuType[] = [
    { id: 0, menu: "작품소개" },
    { id: 1, menu: "에피소드" },
    { id: 2, menu: "댓글" },
  ];

  const menuTitle = router.query.menu;
  const baseUrl = Config().baseUrl;

  const fetchEpisodes = async ({ pageParam = 0 }) => {
    const res = await axios.get(
      `${baseUrl}/sections-service/v1/cards/episodes/${props.novelId}?pagination=${pageParam}`
    );
    return res.data;
  };
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery("episodes", fetchEpisodes, {
      getNextPageParam: (lastPage) => {
        const currentPage = lastPage?.data?.page ?? 0;
        const totalPages = lastPage?.data?.totalPages ?? 0;
        if (currentPage < totalPages) {
          return currentPage + 1;
        }
        return null;
      },
      staleTime: 5 * 1000 * 60 , 
      cacheTime: 10 * 1000 * 60, 
    });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className={style.menutitle}>
        {menulist.map((item, i) => (
          <p
            key={item.id}
            onClick={() => {
              router.push(`/noveldetail/${props.novelId}?menu=${item.menu}`);
            }}
            className={`${menuTitle === item.menu ? style.menuactive : null}`}
          >
            {item.menu}
          </p>
        ))}
      </div>
      {menuTitle === "작품소개" && (
        <>
          <div className={style.infoCentainer}>
            <div className={style.detailTitle}>시놉시스</div>
            <div className={style.authorinfo}>{props.description}</div>
            <LineSeparator colorline="grayline" />
            <div className={style.detailTitle}>작가의 한마디</div>
            <div className={style.authorinfo}>{props.authorComment}</div>
          </div>
        </>
      )}
      {menuTitle === "에피소드" && props.novelId && data && (
        <>
          <EpisodeInfo
            episodes={data.pages.flatMap((page) => page.data.episodes)}
          />
          <div className={style.refcheck} ref={ref}></div>
        </>
      )}
      {menuTitle === "댓글" && (
        <>
          <div className={style.infoCentainer}>
            <CommentsCheck />
            <CommentList />
          </div>
        </>
      )}
    </>
  );
}
