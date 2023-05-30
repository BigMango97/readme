import React from "react";
import Footer from "@/components/layouts/Footer";
import Logout from "@/components/pages/mypage/Logout";
import MypageInfo from "@/components/pages/mypage/MypageInfo";
import MypageList from "@/components/pages/mypage/MypageList";
import isLogin from "@/configs/isLogin";
import Login from "./login";

export default function Mypage() {
  return (
    <>
      <MypageInfo />
      <MypageList />
      <Logout />
      <Footer />
    </>
  );
}
