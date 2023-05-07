import React from "react";
import AllNovelMenu from "@/components/pages/novel/AllNovelMenu";
import AllNovelTotalCount from "@/components/pages/novel/AllNovelTotalCount";
import Footer from "@/components/layouts/Footer";
import AllNovelCardSection from "@/components/pages/novel/AllNovelCardSection";

export default function novel() {
  return (
    <>
      <AllNovelMenu />
      <AllNovelTotalCount/>
      <AllNovelCardSection/>
      <Footer/>
    </>
  );
}
