import React from "react";
import Layout from "@/components/layouts/layout";
import { NextPageWithLayout } from "./_app";
import Image from "next/image";
import MainInfo from "@/components/pages/mypage/MainInfo";
import MypageList from "@/components/ui/MypageList";

const Mypage: NextPageWithLayout = () => {
  return (
    <>
     <MainInfo/>
     <MypageList/>
     <MypageList/>
     <MypageList/>
     <MypageList/>
     <MypageList/>
    </>
  );
};

Mypage.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

export default Mypage;
