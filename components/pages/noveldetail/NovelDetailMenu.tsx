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
  title: string;
}
export default function NovelDetailMenu(props: {
  novelId: number;
  description: string;
  authorComment: string;
}) {
  const router = useRouter();
  const menulist: menuType[] = [
    { id: 0, title: "작품소개" },
    { id: 1, title: "에피소드" },
    { id: 2, title: "댓글" },
  ];

  const menuTitle = router.query;
  const [episodes, setEpisodes] = useState<episodeCardDataType[] | []>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = Config().baseUrl;
  useEffect(() => {
    if (menuTitle.menu === "에피소드" && menuTitle.novelId) {
      setLoading(true);
      axios
        .get(
          `${baseUrl}/sections-service/v1/cards/episodes/${menuTitle.novelId}`
        )
        .then((res) => {
          setEpisodes(res.data.data.episodes);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [menuTitle.menu, menuTitle.novelId]);

  useEffect(() => {}, [episodes]);

  return (
    <>
      <div className={style.menutitle}>
        {menulist.map((item, i) => (
          <p
            key={item.id}
            onClick={() => {
              router.push(`/noveldetail/${props.novelId}?menu=${item.title}`);
            }}
            className={`${
              menuTitle.menu === item.title ? style.menuactive : null
            }`}
          >
            {item.title}
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
        <EpisodeInfo episodes={episodes} />
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
