import React from "react";
import style from "@/components/pages/mypage/Logout.module.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import axios from "@/configs/axiosConfig";
export default function Logout() {
  const [, , removeCookie] = useCookies(["accessToken", "uuid"]);
  const router = useRouter();
  const logoutHandle = () => {
    sessionStorage.clear();

    removeCookie("accessToken", { path: "/" });
    removeCookie("uuid", { path: "/" });
    axios.defaults.headers.common["Authorization"] = `Bearer `;
    axios.defaults.headers.common["uuid"] = ``;

    router.push("/");
  };
  return (
    <div className={style.logoutContainer} onClick={logoutHandle}>
      로그아웃
    </div>
  );
}
