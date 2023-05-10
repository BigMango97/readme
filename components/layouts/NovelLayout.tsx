import React from "react";
import { ReactNode } from "react";
import AllNovelMenu from "../pages/novel/AllNovelMenu";
import Footer from "./Footer";

export default function NovelLayout(props: { children: ReactNode }) {
  return (
    <>
      <AllNovelMenu />
      <main>{props.children}</main>
      <Footer />
    </>
  );
}
