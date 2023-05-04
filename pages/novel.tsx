import React from "react";
import AllNovelMenu from "@/components/pages/novel/AllNovelMenu";
import AllNovelCard from "@/components/pages/novel/AllNovelCard";
import AllNovelTotalCount from "@/components/pages/novel/AllNovelTotalCount";
import Footer from "@/components/layouts/Footer";

export default function novel() {
  return (
    <>
      <AllNovelMenu />
      <AllNovelTotalCount/>
      <AllNovelCard />
      <Footer/>
    </>
  );
}
