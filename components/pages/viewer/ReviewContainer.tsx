import React, { useState } from "react";
import ReviewRating from "@/components/ui/ReviewRating";
import style from "@/components/pages/viewer/ReviewContainer.module.css";
import axios from "axios";
import { useMutation, useQuery } from "react-query";
import Config from "@/configs/config.export";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import { useQueryClient } from "react-query";
import { useEffect } from "react";
import Swal from "sweetalert2";
interface Props {
  novelId: number;
  onClose: () => void;
}
type MutationParams = {
  starRating: any;
  episodeId: number;
  novelId: number;
};

export default function ReviewContainer({ novelId, onClose }: Props) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const episodeId = Number(router.asPath.split("/")[2]);
  const [cookies] = useCookies(["uuid", "access_token"]);
  const [clicked, setClicked] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
  ]);
  const handleStarClick = (index: number): void => {
    let clickStates: boolean[] = [...clicked];
    for (let i = 0; i < 5; i++) {
      clickStates[i] = i <= index ? true : false;
    }
    setClicked(clickStates);
  };

  const baseUrl = Config().baseUrl;
  const { data: rating, isError } = useQuery(
    ["starRating", episodeId],
    () =>
      axios
        .get(`${baseUrl}/utils-service/v1/starRating/episode/${episodeId}`, {
          headers: {
            uuid: cookies.uuid,
          },
        })
        .then((res) => res.data),
    { enabled: !!episodeId }
  );

  useEffect(() => {
    if (rating && rating.data.starRating !== undefined) {
      handleStarClick(rating.data.starRating - 1);
    }
  }, [rating, rating?.data?.starRating]);

  const mutation = useMutation(
    (params: MutationParams) =>
      axios.post(`${baseUrl}/utils-service/v1/starRating`, params, {
        headers: {
          uuid: cookies.uuid,
          // 'Authorization': `Bearer ${cookies.access_token}`
        },
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["starRating", episodeId]);
        onClose();
      },
      onError: () => {
        console.log("오류가 발생했습니다. 다시 시도해주세요.");
      },
    }
  );

  const submitRating = () => {
    const starRating = clicked.filter(Boolean).length;
    const rated = rating.data.rated;
    const mutationParams = { starRating, episodeId, novelId };
    if (rated) {
      mutation.mutate(mutationParams);
      Swal.fire({
        toast: true,
        position: "bottom",
        icon: "success",
        title: "별점이 수정되었습니다",
        showConfirmButton: false,
        timer: 1000,
      });
    } else {
      mutation.mutate(mutationParams);
      Swal.fire({
        toast: true,
        position: "bottom",
        icon: "success",
        title: "별점이 등록되었습니다",
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  return (
    <div className={style.reviewCotainer}>
      <div className={style.reviewTitle}>회차 별점 남기기</div>
      <ReviewRating clicked={clicked} onStarClick={handleStarClick} />
      <div className={style.checkBtn}>
        <button type="button" onClick={onClose}>
          취소
        </button>
        <button type="button" onClick={submitRating}>
          완료
        </button>
      </div>
    </div>
  );
}
