import React, { useState } from "react";
import style from "@/components/pages/noveldetail/NovelDetailMenu.module.css";
import TagUi from "@/components/ui/TagUi";
import NovelIntroduce from "./NovelIntroduce";
import EpisodeInfo from "./EpisodeInfo";
export interface menuType {
  id: number;
  title: string;
}
export default function NovelDetailMenu() {
  const [currentTab, setCurrentTap] = useState(0);
  const menulist: menuType[] = [
    { id: 0, title: "Synopsis" },
    { id: 1, title: "Episode" },
  ];
  const selectmenuHandler = (index: number) => {
    console.log(index);
    setCurrentTap(index);
  };
  return (
    <>
      <div className={style.menutitle}>
        {menulist.map((item, i) => (
          <p
            key={i}
            onClick={() => selectmenuHandler(i)}
            className={`${currentTab === i ? style.menuactive : null}`}
          >
            {item.title}
            {item.title === "Episode" && (
              <span className={style.Episodecount}>(24)</span>
            )}
          </p>
        ))}
        {}
      </div>
      {currentTab === 0 ? 
        <>
          <TagUi title={"웹소설판타지"} />
          <NovelIntroduce />
        </>
      :<EpisodeInfo/>}
    </>
  );
}
