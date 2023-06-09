import React, { useEffect } from "react";
import axios from "@/configs/axiosConfig";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import SearchBox from "@/components/pages/search/SearchBox";
import RecentSearchTop from "@/components/pages/search/RecentSearchTop";
import RecentSearchItems from "@/components/pages/search/RecentSearchItems";
import RecommendItems from "@/components/pages/search/RecommendItems";
import Footer from "@/components/layouts/Footer";
import Config from "@/configs/config.export";
import { recentSearchWord } from "@/state/recentSearchWord";
interface ErrorType extends Error {
  message: string;
}
const baseUrl = Config().baseUrl;
const fetchKeyword = async (keyword: string) => {
  const response = await axios.get(
    `/sections-service/v1/cards/novels/search?keyword=${keyword}`
  );
  return response;
};

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword as string;
  const [keyWordList, setKeywordList] = useRecoilState(recentSearchWord);
  const { isError, data, error } = useQuery(
    ["keyword", keyword],
    () => fetchKeyword(keyword),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error: ErrorType) => {
        console.log(error.message);
      },
      select: (data) => {
        return data.data;
      },
      enabled: !!keyword,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = localStorage.getItem("keywordList");
      if (res !== null) {
        const keywordList = JSON.parse(res);
        setKeywordList(keywordList);
      }
    }
  }, [setKeywordList]);

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <SearchBox data={data?.data.novelCardsData} />
      {!data && (
        <>
          <RecentSearchTop />
          <RecentSearchItems />
          <RecommendItems />
        </>
      )}
      <Footer />
    </>
  );
}
