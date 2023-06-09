import React, { useEffect, useState } from "react";
import Footer from "@/components/layouts/Footer";
import Logout from "@/components/pages/mypage/Logout";
import MypageInfo from "@/components/pages/mypage/MypageInfo";
import MypageList from "@/components/pages/mypage/MypageList";

import Login from "./login";
import { useCookies } from "react-cookie";
import PointPurchased from "@/components/pages/mypage/PointPurchased";
import { FastForwardFilled } from "@ant-design/icons";

export default function Mypage() {
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  const [menuId, setMenuId] = useState<number>(0);

  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, [menuId]);
  return (
    <>
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
