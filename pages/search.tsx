import React from "react";
import SearchBox from "@/components/pages/search/SearchBox";
import RecentSearchTop from "@/components/pages/search/RecentSearchTop";
import RecentSearchItems from "@/components/pages/search/RecentSearchItems";
import RecommendTop from "@/components/pages/search/RecommendTop";
import RecommendItems from "@/components/pages/search/RecommendItems";
import Footer from "@/components/layouts/Footer";

export default function Search() {
  return (
    <>
      <SearchBox />
      <RecentSearchTop />
      <RecentSearchItems />
      <RecommendTop />
      <RecommendItems />
      <Footer />
    </>
  );
}
