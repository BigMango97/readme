import React, { useState } from "react";
import { episodeCardDataType } from "@/types/model/mainDataType";
import EpisodeCard from "./EpisodeCard";
import { useRouter } from "next/router";
import style from "@/components/pages/noveldetail/EpisodeInfo.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { SortType } from "./NovelDetailMenu";
import ConfirmModal from "@/components/ui/ConfirmModal";
import axios from "@/configs/axiosConfig";
import { useCookies } from "react-cookie";
export default function EpisodeInfo(props: {
  episodes: episodeCardDataType[];
  sort: SortType;
  onSortChange: (newSort: SortType) => void;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [situation, setSituation] = useState<"결제" | "부족">("부족");
  const [color, setColor] = useState<string>("");
  const [epiId, setEpiId] = useState<number>(0);
  const [cookies] = useCookies(["uuid"]);

  const directViewPage = async (id: number, free: boolean) => {
    setEpiId(id);
    //무료일때
    if (free) {
      router.push(`/viewer/${id}`);
    }
    //유료일때
    else {
      //로그인 여부 확인
      if (cookies.uuid) {
        //구매한 소설인 지 확인
        const response = await axios.get(
          `/payments-service/v1/payments/checkPurchased?episodeId=${id}`
        );
        //구매 x -> 에피소드구매
        if (response.data.data.result === false) {
          const userPoint = Number(localStorage.getItem("point"));

          //포인트 부족
          if (userPoint < 100) {
            setColor("green");
            setSituation("부족");
            setIsModalOpen(!isModalOpen);
          }
          //포인트 보유
          else {
            setColor("purple");
            setSituation("결제");
            setIsModalOpen(!isModalOpen);
          }
        }
        //구매한 소설
        else {
          router.push(`/viewer/${id}`);
        }
      } //로그인 x
      else {
        localStorage.setItem("link", router.asPath);
        router.push("/login");
      }
    }
  };

  return (
    <>
      {isModalOpen ? (
        <ConfirmModal
          color={color}
          epiId={epiId}
          situation={situation}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <div className={style.container}>
          <div className={style.sortNovel}>
            <LineSeparator colorline="greenline" />
            <div
              className={
                props.sort === "최신순" ? style.activeSort : style.hidden
              }
              onClick={() => props.onSortChange("최신순")}
            >
              최신순
            </div>
            <div
              className={
                props.sort === "1화부터" ? style.activeSort : style.hidden
              }
              onClick={() => props.onSortChange("1화부터")}
            >
              1화부터
            </div>
          </div>
          {props.episodes &&
            props.episodes.map((item, index) => (
              <div
                key={index}
                onClick={() => directViewPage(item.id, item.free)}
              >
                <EpisodeCard
                  name={item.name}
                  free={item.free}
                  registrationDate={item.registrationDate}
                  starRating={item.starRating}
                  new={item.new}
                />
              </div>
            ))}
        </div>
      )}
    </>
  );
}
