import React, { useState, useEffect } from "react";
import StarRating from "@/components/ui/StarRating";
import style from "@/components/pages/viewer/StarRatingContainer.module.css";
import axios from "@/configs/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
import { shouldRefetchTotalRatingState } from "@/state/rating";
interface Props {
  novelId: number;
  onClose: () => void;
}
type MutationParams = {
  starRating: any;
  episodeId: number;
  novelId: number;
};

export default function StarRatingContainer({ novelId, onClose }: Props) {
  const setShouldRefetchTotalRating = useSetRecoilState(
    shouldRefetchTotalRatingState
  );
  const router = useRouter();
  const episodeId = Number(router.query.episodeId);
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

  const { data: rating, isError } = useQuery(
    ["starRating", episodeId],
    () =>
      axios
        .get(`/utils-service/v1/starRating/episode/${episodeId}`, {
          headers: {
            uuid: cookies.uuid,
          },
        })
        .then((res) => res.data),
    { enabled: !!episodeId }
  );
  useEffect(() => {
    if (rating && rating.data.myRating !== undefined) {
      handleStarClick(rating.data.myRating - 1);
    }
  }, [rating]);

  const mutation = useMutation(
    (params: MutationParams) =>
      axios.post(`/utils-service/v1/starRating`, params, {}),
    {
      onSuccess: (data) => {
        setShouldRefetchTotalRating(true);
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
    mutation.mutate(mutationParams);
    Swal.fire({
      toast: true,
      position: "bottom",
      icon: "success",
      title: rated ? "별점이 수정되었습니다" : "별점이 등록되었습니다",
      showConfirmButton: false,
      timer: 1000,
    });
  };

  return (
    <div className={style.reviewCotainer}>
      <div className={style.reviewTitle}>회차 별점 남기기</div>
      <StarRating clicked={clicked} onStarClick={handleStarClick} />
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
