import React from "react";
import LineSeparator from "./LineSeparator";
import style from "@/components/ui/Comment.module.css";
import NewUi from "./NewUi";
import Image from "next/image";
import { useCookies } from "react-cookie";
import { useMutation, useQueryClient } from 'react-query';
import Config from "@/configs/config.export";
import axios from "axios"
import Swal from "sweetalert2";
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
  onDelete
}: Props) {
  const [cookies] = useCookies(["uuid"]);
  const queryClient = useQueryClient();
  const baseUrl = Config().baseUrl;

  const deleteComment = async () => {
    const response = await axios.delete(
      `${baseUrl}/utils-service/v1/comments/${id}`, {
        headers: {
          uuid: cookies.uuid,
        },
      }
    );
    return response.data;
  };
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
          <div className={style.episodeTitle} >신과함께 레벨업 080화</div>
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
