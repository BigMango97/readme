import React from "react";
import style from "@/components/pages/search/RecommendItems.module.css";
import LineSeparator from "@/components/ui/LineSeparator";
import { useQuery } from "react-query";
import Image from "next/image";
import Link from "next/link";
import { keywordRankingFetch } from "@/pages/api/batch-service";
import { keywordRankingResultType } from "@/types/service/batch-service";

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
          <p>실시간 인기 검색어</p>
        </div>
        <div className={style.recommendsStatusTime}>
          {keywordRankingStatusData} 기준
        </div>
      </div>
      <div className={style.recommendList}>
        {keywordrankingData?.map((data, index) => (
          <>
            <div className={style.recommendItem} key={index}>
              <div className={style.recommendKeywordRanking}>
                {data?.ranking}
              </div>
              {data?.changeRanking > 0 && (
                <>
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
                  <div className={style.recommendKeywordChange}>
                    {data?.changeRanking}
                  </div>
                </>
              )}
              {data?.changeRanking < 0 && (
                <>
                  <div className={style.recommendKeywordStatusImage}>
                    <Image
                      src={"/assets/images/icons/down.svg"}
                      alt={"Down"}
                      width={10}
                      height={10}
                      loading="lazy"
                      placeholder="empty"
                    />
                  </div>
                  <div className={style.recommendKeywordChange}>
                    {Math.abs(data?.changeRanking)}
                  </div>
                </>
              )}
              {data?.changeRanking === 0 && (
                <>
                  <div className={style.recommendKeywordStatusImage}>
                    <Image
                      src={"/assets/images/icons/notchange.svg"}
                      alt={"No Change"}
                      width={10}
                      height={10}
                      loading="lazy"
                      placeholder="empty"
                    />
                  </div>
                </>
              )}
              {data?.changeRanking === null && (
                <>
                  <div className={style.recommendNew}>NEW</div>
                </>
              )}
              <Link href={`/search?keyword=${data.keyword}`}>
                <div className={style.recommendKeywordTitle}>
                  {data.keyword.length > 10
                    ? `${data.keyword.substring(0, 10)}...`
                    : data.keyword}
                </div>
              </Link>
            </div>
          </>
        ))}
      </div>
      <LineSeparator colorline="grayline" />
    </div>
  );
}
