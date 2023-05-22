import React from "react";
import Footer from "@/components/layouts/Footer";
import Logout from "@/components/pages/mypage/Logout";
import MypageInfo from "@/components/pages/mypage/MypageInfo";
import MypageList from "@/components/pages/mypage/MypageList";

export default function mypage() {
  return (
    <>
      <MypageInfo />
      <MypageList />
      <Logout />
      <Footer />
    </>
  );
}
