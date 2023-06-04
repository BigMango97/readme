import React from "react";
import style from "@/components/pages/mypage/Logout.module.css";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
export default function Logout() {
  const [, , removeCookie] = useCookies(["accessToken", "uuid"]);
  const router = useRouter();
  const logoutHandle = () => {
    //localStorage.removeItem("uuid");
    localStorage.removeItem("name");
    localStorage.removeItem("nickname");
    localStorage.removeItem("point");
    localStorage.removeItem("profileImg");
    localStorage.removeItem("age");

    removeCookie("accessToken", { path: "/" });
    removeCookie("uuid", { path: "/" });

    router.push("/");
  };
  return (
    <div className={style.logoutContainer} onClick={logoutHandle}>
      로그아웃
    </div>
  );
}
