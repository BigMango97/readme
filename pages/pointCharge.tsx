import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Login from "./login";
import Head from "next/head";
import PointMiddle from "@/components/pages/point/PointMiddle";
import PointTop from "@/components/pages/point/PointTop";
import PointBottom from "@/components/pages/point/PointBottom";

export default function PointCharge() {
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, []);

  return (
    <>
      <Head>
        <title> {`포인트 충전 | ReadMe`}</title>
        <meta name="description" content="포인트 충전 페이지 입니다." />
      </Head>
      {loginCheck ? (
        <>
          <PointTop />
          <PointMiddle />
          <PointBottom />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
