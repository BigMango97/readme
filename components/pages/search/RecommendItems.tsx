import React from "react";
import style from "@/components/pages/search/RecommendItems.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { useQuery } from "react-query";
import { keywordRankingFetch } from "@/pages/api/batch-service";
import { keywordRankingResultType } from "@/types/service/batch-service";
import Image from "next/image";
export default function RecommendItems() {
  const keywordRankingQuery = useQuery<keywordRankingResultType>(
    ["keywordRanking"],
    keywordRankingFetch
  );

  const keywordRankingResult = keywordRankingQuery?.data;
  const keywordRankingStatusData = keywordRankingResult?.searchDate;
  const keywordrankingData = keywordRankingResult?.searchRankingData;

  return (
    <div className={style.recommendItemsContainer}>
      <div className={style.recommendTopWrap}>
        <div className={style.recommendTopTitle}>
          <p>실시간 급상승 검색어</p>
        </div>
        <div className={style.recommendsStatusTime}>
          {keywordRankingStatusData} 기준
        </div>
      </div>
      <div className={style.recommendItem}>
        <div className={style.recommendKeywordRanking}>1</div>
        <div className={style.recommendKeywordTitle}>로맨스 판타지 </div>
        <div className={style.recommendKeywordStatusImage}>
          <Image
            src={"/assets/images/icons/up.svg"}
            alt={"Up"}
            width={10}
            height={10}
            loading="lazy"
            placeholder="empty"
          />
        </div>
        <div className={style.recommendKeywordChange}>3</div>
      </div>
      <LineSeparator colorline="grayline" />
    </div>
  );
}
