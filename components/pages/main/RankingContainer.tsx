import React from "react";
import { useQuery } from "react-query";
import MainRanking from "./MainRanking";
import style from "@/components/pages/main/RankingContainer.module.css";
import { novelRankingFetch } from "@/pages/api/batch-service";
import { novelRankingResultType } from "@/types/service/batch-service";

export default function RankingContainer() {
  const rankingQuery = useQuery<novelRankingResultType>(
    ["ranking"],
    novelRankingFetch
  );
  const novelRankingResult = rankingQuery?.data;
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
