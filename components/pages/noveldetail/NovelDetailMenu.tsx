import React, { useState } from "react";
import style from "@/components/pages/noveldetail/NovelDetailMenu.module.css";
import EpisodeInfo from "./EpisodeInfo";
import LineSeparator from "@/components/ui/LineSeparator";
import CommentsCheck from "./CommentsCheck";
import CommentList from "./CommentList";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";
import { episodeCardDataType } from "@/types/model/mainDataType";
import Config from "@/configs/config.export";
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

  const menuTitle = router.query;
  const [episodes, setEpisodes] = useState<episodeCardDataType[] | []>([]);

  const baseUrl = Config().baseUrl;
  useEffect(() => {
    axios
      .get(`${baseUrl}/sections-service/v1/cards/episodes/${menuTitle.novelId}`)
      .then((res) => {
        setEpisodes(res.data.data.episodes);
      })
      .catch((error) => {
        console.log;
      });
  }, [baseUrl, menuTitle.menu, menuTitle.novelId]);

  return (
    <>
      <div className={style.menutitle}>
        {menulist.map((item, i) => (
          <p
            key={item.id}
            onClick={() => {
              router.push(`/noveldetail/${props.novelId}?menu=${item.menu}`);
            }}
            className={`${
              menuTitle.menu === item.menu ? style.menuactive : null
            }`}
          >
            {item.menu}
          </p>
        ))}
      </div>
      {menuTitle.menu === "작품소개" && (
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
      {menuTitle.menu === "에피소드" && menuTitle.novelId && (
        <EpisodeInfo episodes={episodes}/>
      )}
      {menuTitle.menu === "댓글" && (
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
