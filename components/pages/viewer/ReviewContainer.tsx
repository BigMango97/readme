import React, { useState } from "react";
import ReviewRating from "@/components/ui/ReviewRating";
import style from "@/components/pages/viewer/ReviewContainer.module.css";
import axios from "axios"
import {useMutation} from "react-query"
import Config from "@/configs/config.export";
import { useRouter } from "next/router";
import { useCookies } from 'react-cookie';
interface Props{
  novelId:number
}
type MutationParams = {
  starRating: number;
  episodeId: number;
  novelId: number;
};


export default function ReviewContainer({novelId}:Props) {
  const router = useRouter();
  const episodeId = Number(router.asPath.split("/")[2]);
  const [cookies] = useCookies(['uuid', 'access_token']);
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

//   const mutation = useMutation((params: MutationParams) =>
//   axios.post(`${baseUrl}/utils-service/v1/starRating`,  params, {
//     headers: {
//       uuid: cookies.uuid,
//       // 'Authorization': `Bearer ${cookies.access_token}`
//     }
//   }), 
// {
//   onSuccess: () => {
//     alert('별점이 성공적으로 등록되었습니다!');
//   },
//   onError: () => {
//     alert('오류가 발생했습니다. 다시 시도해주세요.');
//   }
// });


// const submitRating = () => {
//   const starRating = clicked.filter(Boolean).length;
//   mutation.mutate({ starRating, episodeId, novelId });
//   console.log("dddddddd성공!")
// };
const submitRating = async () => {
  const starRating = clicked.filter(Boolean).length;
  try {
    const response = await axios.post(`${baseUrl}/utils-service/v1/starRating`, { starRating, episodeId, novelId }, {
      headers: {
        uuid: "1234",
        // 'Authorization': `Bearer ${cookies.access_token}`
      }
    });
    console.log("성공!");
    alert('별점이 성공적으로 등록되었습니다!');
  } catch (error) {
    console.error("에러발생:", error);
    alert('오류가 발생했습니다. 다시 시도해주세요.');
  }
};

  return (
    <div className={style.reviewCotainer}>
      <div className={style.reviewTitle}>회차 별점 남기기</div>
      <ReviewRating clicked={clicked} onStarClick={handleStarClick} />
      <div className={style.checkBtn}>
        <button type="button">취소</button>
        <button type="button" onClick={submitRating}>확인</button>
      </div>
    </div>
  );
}
