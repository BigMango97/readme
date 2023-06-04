import React from "react";
import { useQuery } from "react-query";
import MainRanking from "./MainRanking";
import axios from "@/configs/axiosConfig";
import style from "@/components/pages/main/RankingContainer.module.css";

const novelRankingData = async () => {
  const response = await axios.get(`/batch-service/v1/rankings`);
  return response.data;
};

export default function RankingContainer() {
  const rankingQuery = useQuery(["ranking"], novelRankingData);
  const novelRankingResult = rankingQuery?.data?.data;
  const rankingData = novelRankingResult?.novelRankingData;
  return (
    <section className={style.novelRankingContainer}>
      <div className={style.rankingInfo}>
        <div className={style.rankingTitle}>실시간 랭킹!</div>
        <div className={style.rankingTime}>
          {novelRankingResult?.viewsDate}기준
        </div>
      </div>
      <div className={style.rankingCheck}>
        {rankingData?.map((data: any) => (
          <MainRanking key={data.novelId} data={data} />
        ))}
      </div>
    </section>
  );
}
