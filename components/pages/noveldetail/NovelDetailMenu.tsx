import React, { useState } from "react";
import style from "@/components/pages/noveldetail/NovelDetailMenu.module.css";
import TagUi from "@/components/ui/TagUi";
import NovelIntroduce from "./NovelIntroduce";
import EpisodeInfo from "./EpisodeInfo";
import { tagType } from "@/types/model/detailPageDataTypes";
import DetailTitle from "@/components/ui/DetailTitle";
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
            <DetailTitle
              title={"시놉시스"}
              size={"0.875rem"}
              leftsize={"2rem"}
              fontweight={550}
            />
            <NovelIntroduce />
            <LineSeparator
              backgroundcolor={"#99ffb5"}
              width="80%"
              height="1px"
              margin="1rem 2rem"
            />
            <DetailTitle
              title={"작가의 한마디"}
              size={"0.875rem"}
              leftsize={"2rem"}
              fontweight={550}
            />
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
