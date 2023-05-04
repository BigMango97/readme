import React from "react";
import SearchBox from "@/components/pages/search/SearchBox";
import RecentSearchTop from "@/components/pages/search/RecentSearchTop";
import RecentSearchItems from "@/components/pages/search/RecentSearchItems";
import RecommendTags from "@/components/pages/search/RecommendTags";
import RecommendTop from "@/components/pages/search/RecommendTop";

export default function Search() {
  return (
    <>
      <SearchBox />
      <RecentSearchTop />
      <RecentSearchItems />
      <RecommendTop />
      <RecommendTags />
    </>
  );
}
