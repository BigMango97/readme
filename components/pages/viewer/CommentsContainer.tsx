import React from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import Config from "@/configs/config.export";
import style from "@/components/pages/viewer/CommentsContainer.module.css";
import WriteComment from "@/components/ui/WriteComment";
import Comment from "@/components/ui/Comment";
import Swal from "sweetalert2";
import Image from "next/image";
interface Props {
  novelId: number;
  title:string
}
export default function CommentContainer({ novelId , title}: Props) {
  const router = useRouter();
  const episodeId = router.asPath.split("/")[2];
  const [cookies] = useCookies(["uuid"]);
  const baseUrl = Config().baseUrl;
  const queryClient = useQueryClient();
  const { data: comments } = useQuery(
    ["comments", episodeId],
    () =>
      axios
        .get(`${baseUrl}/utils-service/v1/comments/episodes/${episodeId}`, {
          headers: {
            uuid: cookies.uuid,
          },
        })
        .then((res) => res.data),
    { enabled: !!episodeId }
  );

  const COMMENTLENGTH = comments?.data.contents.length;
  const deleteCommentMutation = useMutation(
    (commentId: number) =>
      axios.delete(`${baseUrl}/utils-service/v1/comments/${commentId}`, {
        headers: {
          uuid: cookies.uuid,
        },
      }),
    {
      onSuccess: () => {
        console.log("댓글이 성공적으로 삭제되었습니다!");
        queryClient.invalidateQueries(["comments", episodeId]);
      },
      onError: (error) => {
        Swal.fire({
          icon: "warning",
          text: "댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    }
  );

  const handleDeleteComment = async (commentId: number) => {
    try {
      const result = await Swal.fire({
        icon: "info",
        text: "댓글을 삭제하시겠습니까?",
        cancelButtonText: "취소",
        showCancelButton: true,
        customClass: {
          confirmButton: "swal-confirm-button",
          cancelButton: "swal-cancel-button",
        },
      });
      if (result.isConfirmed) {
        await deleteCommentMutation.mutateAsync(commentId);
      }
    } catch (error) {
      console.log(
        "댓글 삭제 중 오류가 발생했습니다. 다시 시도해주세요.",
        error
      );
    }
  };
  return (
    <>
      <div className={style.commentsTitle}>댓글 ({COMMENTLENGTH})</div>
      {comments?.data?.contents.length !== 0 ? (
        <div className={style.commentsList}>
          {comments?.data.contents.map((comment: any) => (
            <Comment
              key={comment.id}
              {...comment}
              onDelete={handleDeleteComment}
            />
          ))}
        </div>
      ) : (
        <div className={style.noComment}>
          <div className={style.noCommentsContainer}>
            <div className={style.commentsImg}>
              <Image
                src="/assets/images/icons/speech-bubble.svg"
                alt="logo"
                width={30}
                height={30}
              />
            </div>
            <p>
              댓글이 없습니다.
              <br /> 첫번째 댓글을 남겨주세요
            </p>
          </div>
        </div>
      )}
      <WriteComment novelId={novelId} title={title}/>
    </>
  );
}
