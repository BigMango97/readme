import React, { useState } from "react";
import style from "@/components/pages/noveldetail/NovelDetailMenu.module.css";
import NovelIntroduce from "./NovelIntroduce";
import EpisodeInfo from "./EpisodeInfo";
import LineSeparator from "@/components/ui/LineSeparator";
import CommentsCheck from "./CommentsCheck";
import CommentList from "./CommentList";

export interface menuType {
  id: number;
  title: string;
}
export default function NovelDetailMenu() {
  const [currentTab, setCurrentTap] = useState(0);
  const menulist: menuType[] = [
    { id: 0, title: "작품소개" },
    { id: 1, title: "에피소드" },
    { id: 2, title: "댓글" },
  ];
  const selectmenuHandler = (index: number) => {
    setCurrentTap(index);
  };

  return (
    <>
      <div className={style.menutitle}>
        {menulist.map((item, i) => (
          <p
            key={item.id}
            onClick={() => selectmenuHandler(i)}
            className={`${currentTab === i ? style.menuactive : null}`}
          >
            {item.title}
            {item.title === "Episode" && (
              <span className={style.Episodecount}>(24)</span>
            )}
            {item.title === "Comments" && (
              <span className={style.Episodecount}>(24)</span>
            )}
          </p>
        ))}
      </div>
      {currentTab === 0 && (
        <>
          <div className={style.infoCentainer}>
            <div className={style.detailTitle}>시놉시스</div>
            <NovelIntroduce />
            <LineSeparator colorline="grayline" />
            <div className={style.detailTitle}>작가의 한마디</div>
            <NovelIntroduce />
          </div>
        </>
      )}
      {currentTab === 1 && <EpisodeInfo />}{" "}
      {currentTab === 2 && (
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
