import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

import SearchBox from "@/components/pages/search/SearchBox";
import RecentSearchTop from "@/components/pages/search/RecentSearchTop";
import RecentSearchItems from "@/components/pages/search/RecentSearchItems";
import RecommendTop from "@/components/pages/search/RecommendTop";
import RecommendItems from "@/components/pages/search/RecommendItems";
import Footer from "@/components/layouts/Footer";
import Config from "@/configs/config.export";
interface ErrorType extends Error {
  message: string;
}
const baseUrl = Config().baseUrl;
const fetchKeyword = async (keyword: string) => {
  const response = await axios.get(
    `${baseUrl}/sections-service/v1/cards/novels/search?keyword=${keyword}`
  );
  return response;
};

export default function Search() {
  const router = useRouter();
  const keyword = router.query.keyword as string;

  const { isLoading, isError, data, error } = useQuery(
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
      staleTime:  5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,

    }
  );
  if (isLoading) {
    return <span>Loading...</span>;
  }
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
          <RecommendTop />
          <RecommendItems />
        </>
      )}
      <Footer />
    </>
  );
}
