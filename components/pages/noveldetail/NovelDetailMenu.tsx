import React, { useState } from "react";
import style from "@/components/pages/noveldetail/NovelDetailMenu.module.css";
import TagUi from "@/components/ui/TagUi";
import NovelIntroduce from "./NovelIntroduce";
import EpisodeInfo from "./EpisodeInfo";
import { tagType } from "@/types/model/detailPageDataTypes";
import DetailTitle from "@/components/ui/DetailTitle";

export interface menuType {
  id: number;
  title: string;
}
export default function NovelDetailMenu(props: {
  tag: tagType[];
  thumbnail: string;
}) {
  const [currentTab, setCurrentTap] = useState(0);
  const [tagData, setTagData] = useState(props.tag);
  const menulist: menuType[] = [
    { id: 0, title: "Synopsis" },
    { id: 1, title: "Episode" },
    { id: 2, title: "Comments" },
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
          <DetailTitle
            title={"태그"}
            size={18}
            leftsize={"2rem"}
            fontweight={800}
          />
          <div className={style.infoCentainer}>
            {tagData.map((item, index) => (
              <>
                <TagUi key={item.id} title={item.name} />
              </>
            ))}
          </div>
          <DetailTitle
            title={"작품소개"}
            size={18}
            leftsize={"2rem"}
            fontweight={800}
          />
          <NovelIntroduce />
          <DetailTitle
            title={"작가의 말"}
            size={18}
            leftsize={"2rem"}
            fontweight={800}
          />
        </>
      )}
      {currentTab === 1 && (
        <EpisodeInfo thumbnail={props.thumbnail} />
      )}
       {currentTab === 2 && (
        <><div></div></>
      )}
    </>
  );
}
