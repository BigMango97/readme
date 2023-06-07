import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useCookies } from "react-cookie";
import style from "@/components/ui/WriteComment.module.css";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "@/configs/axiosConfig";
interface Props {
  novelId: number;
  title: string;
}

export default function WriteComment({ novelId, title }: Props) {
  const router = useRouter();
  const episodesId = router.asPath.split("/")[2];
  const name = sessionStorage.getItem("nickname");
  const [cookies] = useCookies(["uuid"]);
  const [input, setInput] = useState("");
  const queryClient = useQueryClient();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const postComment = async () => {
    try {
      const response = await axios.post(`utils-service/v1/comments`, {
        writer: name,
        content: input,
        episodesId: episodesId,
        novelsId: novelId,
        episodeTitle: title,
      });
      return response.data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const mutation = useMutation(postComment, {
    onSuccess: () => {
      Swal.fire({
        toast: true,
        position: "bottom",
        icon: "success",
        title: "댓글이 등록되었습니다.",
        showConfirmButton: false,
        timer: 1000,
      });
      queryClient.invalidateQueries(["comments", episodesId]);
    },
    onError: () => {
      Swal.fire({
        toast: true,
        position: "bottom",
        icon: "warning",
        title: "댓글 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        showConfirmButton: false,
        timer: 1000,
      });
    },
  });

  const handleCommentSubmit = () => {
    if (!input.trim()) {
      Swal.fire({
        toast: true,
        position: "bottom",
        icon: "info",
        title: "댓글을 입력해주세요",
        showConfirmButton: false,
        timer: 1000,
      });
      return;
    }
    mutation.mutate();
    setInput("");
  };

  return (
    <div className={style.inputContainer}>
      <input
        type="text"
        value={input}
        onChange={handleChange}
        placeholder={cookies.uuid ? "댓글을 입력해주세요" : "로그인 해주세요"}
        disabled={!cookies.uuid}
      />
      <div className={style.commentsBtnContainer}>
        <button
          type="button"
          className={style.commentsBtn}
          onClick={handleCommentSubmit}
          disabled={!cookies.uuid}
        >
          등록
        </button>
      </div>
    </div>
  );
}
