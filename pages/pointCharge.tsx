import PointMiddle from "@/components/pages/point/PointMiddle";
import PointTop from "@/components/pages/point/PointTop";
import PointBottom from "@/components/pages/point/PointBottom";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { RecoilRoot } from "recoil";
import Login from "./login";

export default function PointCharge() {
  const [cookies] = useCookies(["uuid"]);
  const [loginCheck, setLoginCheck] = useState<boolean>(false);
  useEffect(() => {
    setLoginCheck(cookies.uuid);
  }, []);

  return (
    <>
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
