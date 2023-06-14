import React, { useEffect } from "react";
import axios from "@/configs/axiosConfig";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Head from "next/head";
import { useRecoilState } from "recoil";
import { recentSearchWord } from "@/state/recentSearchWord";
import SearchBox from "@/components/pages/search/SearchBox";
import RecentSearchTop from "@/components/pages/search/RecentSearchTop";
import RecentSearchItems from "@/components/pages/search/RecentSearchItems";
import RecommendItems from "@/components/pages/search/RecommendItems";
import Footer from "@/components/layouts/Footer";
import Config from "@/configs/config.export";

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
  const { data } = useQuery(["keyword", keyword], () => fetchKeyword(keyword), {
    onError: (error: ErrorType) => {
      console.log(error.message);
    },
    select: (data) => {
      return data.data;
    },
    enabled: !!keyword,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const res = localStorage.getItem("keywordList");
      if (res !== null) {
        const keywordList = JSON.parse(res);
        setKeywordList(keywordList);
      }
    }
  }, [setKeywordList]);

  return (
    <>
      <Head>
        <title>
          {keyword === undefined ? `검색 | ReadMe` : `검색결과  | ReadMe`}
        </title>
        <meta name="description" content="내가 원하는 소설을 검색해서 찾다!" />
      </Head>
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
