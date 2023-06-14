import React, { useEffect, useState } from "react";
import Login from "./login";
import { useCookies } from "react-cookie";
import Head from "next/head";

import Footer from "@/components/layouts/Footer";
import Logout from "@/components/pages/mypage/Logout";
import MypageInfo from "@/components/pages/mypage/MypageInfo";
import MypageList from "@/components/pages/mypage/MypageList";
import PointPurchased from "@/components/pages/mypage/PointPurchased";

export default function Mypage() {
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  const [menuId, setMenuId] = useState<number>(0);

  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, [menuId]);

  return (
    <>
      <Head>
        <title> {`마이페이지 | ReadMe`}</title>
        <meta name="description" content="마이페이지 입니다." />
      </Head>
      {loginCheck ? (
        menuId === 1 ? (
          <PointPurchased setMenuId={setMenuId} />
        ) : (
          <>
            <MypageInfo />
            <MypageList setMenuId={setMenuId} />
            <Logout />
            <Footer />
          </>
        )
      ) : (
        <Login />
      )}
    </>
  );
}
