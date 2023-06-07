import React, { useEffect, useState } from "react";
import Footer from "@/components/layouts/Footer";
import Logout from "@/components/pages/mypage/Logout";
import MypageInfo from "@/components/pages/mypage/MypageInfo";
import MypageList from "@/components/pages/mypage/MypageList";

import Login from "./login";
import { useCookies } from "react-cookie";

export default function Mypage() {
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);

  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, []);
  return (
    <>
      {loginCheck ? (
        <>
          <MypageInfo />
          <MypageList />
          <Logout />
          <Footer />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
