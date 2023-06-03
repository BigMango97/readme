import React from "react";
import style from "@/components/pages/noveldetail/CommentList.module.css";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";
import Comment from "@/components/ui/Comment";
import Swal from "sweetalert2";
import CommentsCheck from "./CommentsCheck";

export default function CommentList() {
  const router = useRouter();
  const novelId = router.asPath.split("/")[2];
  const [cookies] = useCookies(["uuid"]);
  const queryClient = useQueryClient();
  const { data } = useQuery(
    ["comments", novelId],
    () =>
      axios
        .get(`/utils-service/v1/comments/novels/${novelId}`, {
          headers: {
            uuid: cookies.uuid,
          },
        })
        .then((res) => res.data),
    { enabled: !!novelId }
  );
  const novelcommentData = data?.data?.contents;
  const novelCommentLength = data?.data?.contents.length;

  const deleteCommentMutation = useMutation(
    (commentId: number) =>
      axios.delete(`/utils-service/v1/comments/${commentId}`, {
        headers: {
          uuid: cookies.uuid,
        },
      }),
    {
      onSuccess: () => {
        console.log("댓글이 성공적으로 삭제되었습니다!");
        queryClient.invalidateQueries(["comments", novelId]);
      },
      onError: (error) => {
        console.error(error)
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
      <div className={style.CommentContainer}>
        <CommentsCheck commentcount={novelCommentLength} />
        {novelcommentData &&
          novelcommentData.map((comment: any) => (
            <Comment
              key={comment.id}
              {...comment}
              onDelete={handleDeleteComment}
            />
          ))}
      </div>
    </>
  );
}
