import React from "react";
import LineSeparator from "./LineSeparator";
import style from "@/components/ui/Comment.module.css";
import NewUi from "./NewUi";
import Image from "next/image";

interface Props {
  content: string;
  createDate: string;
  episodesId: number;
  id: number;
  myComment: boolean;
  novelsId: number;
  recent: boolean;
  uuid: string;
  writer: string;
  episodeTitle:string;
  onDelete: (id: number) => void; 
}
export default function Comment({
  content,
  createDate,
  episodesId,
  id,
  myComment,
  novelsId,
  recent,
  uuid,
  writer,
  episodeTitle,
  onDelete
}: Props) {

  const handleDelete = () => {
    onDelete(id); 
  };

  return (
    <>
      <div className={style.CommentCard}>
        <div className={style.commentListInfo}>
          <div className={style.commentListTitle}>
            <div className={style.commentWriter}>{writer}</div>
            {recent && <NewUi />}
          </div>
          <div className={style.commentDay}>{createDate}</div>
        </div>
        <div className={style.comment}>{content}</div>
        <div className={style.episodeIcons}>
          <div className={style.episodeTitle} >{episodeTitle}</div>
          {myComment && (
            <div onClick={handleDelete}>
              <Image
                src="/assets/images/icons/trash-2.svg"
                alt="trashicon"
                width={20}
                height={20}
              />
            </div>
          )}
        </div>
      </div>
      <LineSeparator colorline="grayline" />
    </>
  );
}
